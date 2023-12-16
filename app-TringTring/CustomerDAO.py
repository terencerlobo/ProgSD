from Config.DBConnection import *
import psycopg2
import psycopg2.extras
import json
import time
import datetime

from datetime import datetime

from Vehicle import Vehicle


def fetch_vehicle_list(station_id):
    conn = get_connection()
    curr = conn.cursor()

    curr.execute(f"""SELECT v.vehicle_number, v.vehicle_type, case when vu.vehicle_usage_enddate is not null then vu.vehicle_usage_enddate else 
    vehicle_use_startdate end as last_used_on, vu.vehicle_charge_percentage, vehicle_charge_percentage*2 as vehicle_ride_kms 
    FROM vehicle v right join vehicle_usage vu on v.vehicle_id = vu.vehicle_id where vu.is_active='N' and is_currently_defective='N' 
    and vu.vehicle_current_station_id = {station_id};""")

    vehicle_list = []
    #vehicle_number, vehicle_type, last_used_on, percentage_of_charge
    for record in curr.fetchall():
        vehicle = Vehicle(record[0], record[1], record[2].strftime('%m/%d/%Y'), str(record[3]), record[4])
        vehicle_list.append(vehicle)
        print(record)
   
    curr.close()
    conn.close()
    res = [vl.to_json() for vl in vehicle_list]
    print(res)
    return res


def report_vehicle_dao(vehicle_number, issue_type, issue_description, from_station, priority):
    conn = get_connection()
    curr = conn.cursor()
    curr.execute(f"""INSERT INTO vehicle_issue (vehicle_id, issue_active, issue_type, issue_description, issue_reported_on, current_station, priority) values 
    ((select vehicle_id from vehicle where vehicle_number = '{vehicle_number}'),'Y','{issue_type}','{issue_description}',(SELECT CURRENT_DATE), 
    '{from_station}', '{priority}');""")

    conn.commit()
    curr.close()
    conn.close()


def topup_dao(user_id, topup_amount, card_number, expiry_month_yr, cvv,):
    conn = get_connection()
    curr = conn.cursor()
    select_query = f"""select wallet_amount from ewallet where user_id = {user_id}"""
    curr.execute(select_query)
    for record in curr.fetchall():
        topup_amount = int(topup_amount) + int(record[0])
    print(topup_amount, expiry_month_yr)
    update_query = f"""update ewallet set wallet_amount  = """+str(topup_amount)+""", card_number = """+str(card_number)+""", 
    last_updateddate = now(), expiry_month_yr = '"""+expiry_month_yr+"""', cvv = """+cvv+""" where user_id = """ + str(user_id)
    print(update_query, " ==> update_query..")
    curr.execute(update_query)

    conn.commit()
    curr.close()
    conn.close()


def move_vehicle_dao(from_station, to_station, vehicles, user_id):
    conn = get_connection()
    curr = conn.cursor()
    vehicle_list = vehicles.split(",")
   
    for vl in vehicle_list:
        curr.execute(f"""INSERT INTO vehicle_issue (vehicle_id, issue_active, issue_type, issue_description, issue_reported_on, current_station, move_to_station, priority, 
        identified_by) values 
        ((select vehicle_id from vehicle where vehicle_number = '{vl}'),'Y','Vehicle Movement','Move Vehicle between stations',(now()),{from_station},
        '{to_station}', 'Normal', '{user_id}');""")
      
    conn.commit()
    curr.close()
    conn.close()
    return True
    

def rent_ride_dao(user_id, vehicle_id):
   
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    
    
    sql = """Select vehicle_id, is_active, vehicle_current_station_id from vehicle_usage where vehicle_id = 
    (select vehicle_id from vehicle where vehicle_number = '{}')""".format(vehicle_id)
    cursor.execute(sql)
    for record in cursor.fetchall():
        if record[1] == 'Y':
            response = {'rent_status': 'Ride in use'}
        else:
            stat = record[2]
            now=datetime.now()
            vehicle_id = record[0]
            created_datetime=now.strftime("%Y-%m-%d %H:%M:%S")

            select_query = f"""select wallet_amount from ewallet where user_id = {user_id}"""
            cursor.execute(select_query)
            for record in cursor.fetchall():
                topup_amount = int(record[0])

            if(topup_amount <= 0):
                response = {'rent_status': 'Topup Ewallet to Rent a Ride'}
            else:
                sql2 ="""INSERT INTO customer_vehicle_usage(user_id, 
                vehicle_id, payment_Mode, is_returned, pick_up_time, pick_up_location) Values({}, {}, 'Card', 'N','{}', {});""".format(user_id, vehicle_id, created_datetime, stat)
                cursor.execute(sql2)
                conn.commit()
                sql = "UPDATE vehicle_usage SET is_active = 'Y', vehicle_usage_enddate = null where vehicle_id = {}".format(vehicle_id)
                cursor.execute(sql)
                conn.commit()
                response = {'rent_status': 'Success'}
    return response


def stop_ride_dao(user_id, vehicle_number, station_id):
    conn = get_connection()
    curr = conn.cursor()
    now = datetime.now()
    end_datetime = now.strftime("%Y-%m-%d %H:%M:%S")
    #print(time_stamp)

    sql = """ UPDATE vehicle_usage
              SET is_active =  'N' ,
                  vehicle_usage_enddate  = '{}', vehicle_current_station_id = '{}'
              WHERE vehicle_id = (select vehicle_id from vehicle where vehicle_number = '{}') """.format(end_datetime,station_id,vehicle_number)
    curr.execute(sql)
    total_fare = calculate_ride(vehicle_number, user_id)
    customer_vehicle_usage = """UPDATE customer_vehicle_usage
              SET is_returned =  'Y' ,
                  drop_time  = now(), payment_mode = 'EWallet', payment_amount = '{}'   
              WHERE user_id = '{}' and is_returned = 'N' and vehicle_id = 
              (select vehicle_id from vehicle where vehicle_number = '{}')""".format(total_fare, user_id, vehicle_number)

    select_query = f"""select wallet_amount from ewallet where user_id = {user_id}"""
    curr.execute(select_query)
    for record in curr.fetchall():
        topup_amount = int(record[0]) - int(total_fare)
    
    update_query = f"""update ewallet set wallet_amount  = """+str(topup_amount)+""" where user_id = """ + str(user_id)
    print(update_query, " ==> update_query..")
    curr.execute(update_query)
    curr.execute(customer_vehicle_usage)
    
    conn.commit()
    curr.close()
    conn.close()
    return True
    
def load_rent_dao(user_id):
    conn = get_connection()
    curr = conn.cursor()

    select_query = """select v.vehicle_number, s.station_name, cvu.pick_up_time  from customer_vehicle_usage cvu
                        right join station s on cast(cvu.pick_up_location as numeric ) = s.station_id 
                        right join vehicle v  on cvu.vehicle_id = v.vehicle_id 
                        where user_id = '{}' and is_returned = 'N'""".format(user_id)
    curr.execute(select_query)
    response = {}
    for record in curr.fetchall():
        response["vehicle_number"] = record[0]
        response["station_name"] = record[1]
        response["pick_up_time"] = record[2].strftime("%Y-%m-%d %H:%M:%S")
        response["total_fare"] = calculate_ride(record[0], user_id)


    conn.commit()
    curr.close()

    conn.close()
    print(response)
    return response


def calculate_ride(vehicle_number, user_id):
    conn = get_connection()
    curr = conn.cursor()
    total_fare = 0
    bike_type_query = """select vehicle_type from vehicle where vehicle_number = '{}'""".format(vehicle_number)
    curr.execute(bike_type_query)
    bike_type = ""
    for record in curr.fetchall():
        bike_type = record[0]


    timetaken_query = """select NOW()::timestamp - pick_up_time::timestamp from customer_vehicle_usage cvu  where user_id = '{}' and is_returned = 'N' and vehicle_id = 
              (select vehicle_id from vehicle where vehicle_number = '{}')""".format(user_id, vehicle_number)
    print(timetaken_query)
    curr.execute(timetaken_query)
    #00:07:54.725521
    hours = ""
    for record in curr.fetchall():
        hours = str(record[0]).split(":")[0]
        if(hours == "0"):
            hours = "1"
    conn.commit()
    curr.close()

    conn.close()
        
    if(bike_type == "General Bike"):
        total_fare = int(hours) * 1.5
    if(bike_type == "Premium Bike"):
        total_fare = int(hours) * 3
    if(bike_type == "General Scooter"):
        total_fare = int(hours) * 2
    if(bike_type == "Premium Scooter"):
        total_fare = int(hours) * 4
    print(total_fare, hours)
    return total_fare

#calculate_ride("RX450j", "1")
#load_rent_dao(1)

#move_vehicle_dao(5, 7, "RX450j")

#report_vehicle('1007', 'Puncture', 'Vehicle Punctured', '4', 'High')
fetch_vehicle_list('7')

#rent_ride_dao(1, 'RX450j')

#user_id, topup_amount, card_number, expiry_month_yr, cvv
#topup_dao(1, "1000", "234212352", "10/2025", "234")
#stop_ride(1,'RX450j')
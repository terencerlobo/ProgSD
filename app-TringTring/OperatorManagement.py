from Config.DBConnection import *
from datetime import datetime
from createdict import Create_dict
from ActiveTask import *


def active_tasks_dao():
        
    select_query = """SELECT vi.issue_id, v.vehicle_number, v.vehicle_type, vi.issue_type, vi.issue_reported_on, vi.priority, 
    vi.issue_description from vehicle_issue vi left join vehicle v on vi.vehicle_id = v.vehicle_id where vi.issue_active = 'Y' order by 1 asc;"""
    conn = get_connection()
    curr = conn.cursor()
    curr.execute(select_query)

    # Call custom dict class constructor
    active_tasks_list = []
    #(self,issue_description, issue_id, issue_reported_on, issue_type, priority, vehicle_id, vehicle_type
    for record in curr.fetchall():
        active_tasks = ActiveTask(record[6], record[0], record[4].strftime('%m/%d/%Y'), record[3], record[5], record[1], record[2])
        active_tasks_list.append(active_tasks)

    res = [tl.to_json() for tl in active_tasks_list]
    #print(active_tasks_dict)
    conn.commit()
    conn.close()

    return res


def update_operator(address, phone_number, is_active, email_address, last_name, first_name):
    set_updates = ''
    
    if address != "" and address is not None:
        set_updates += """address = '"""+address+"""',"""
    if phone_number != "" and phone_number is not None:
        set_updates += """phone_number = '"""+phone_number+"""',"""
    if last_name != "" and last_name is not None:
        set_updates += """last_name = '"""+last_name+"""',"""
    if is_active != "" and is_active is not None:
        set_updates += """is_active = '"""+is_active+"""',"""
    if first_name != "" and first_name is not None:
        set_updates += """first_name = '"""+first_name+"""',"""

    set_updates += """last_usage_datetime = (select now())"""
    
    update_query = """update user_profile set """ + set_updates + """ where email_address = '"""+str(email_address)+"""'"""
    conn = get_connection()
    curr = conn.cursor()
    curr.execute(update_query)
    conn.commit()
    conn.close()


def insert_operator_dao(first_name, last_name, pwd, role, address, phone_number, id_proof, id_proof_type, email_address):
    '''INSERT INTO public.user_profile
(first_name, last_name, pwd, "role", address, phone_number, id_proof, id_proof_type, id_proof_doc, is_active, last_usage_datetime, created_datetime, email_adress)
VALUES('Punitha', 'Sakthivel', '3sdf', 'O', 'UKn Belvista', '7259722847', '4564', 'Passport', NULL, '1', '2022-11-02 00:00:00.000', '2022-11-02 00:00:00.000', 
'msams.punitha@gmail.com');
The is_active should be set to 1 always, while inserting. last_usage_datetime, created_datetime should be set to current date time.
'''
    conn = get_connection()
    curr = conn.cursor()
    now=datetime.now()
    curr.execute("""SELECT * from user_profile where user_profile.email_address = '"""+(email_address)+"""'""")
    if curr.fetchall():
        print("USER ALREADY EXIST")
    else:
        is_active=str('1')
        last_usage_datetime=now.strftime("%Y-%m-%d %H:%M:%S")
        created_datetime=now.strftime("%Y-%m-%d %H:%M:%S")
        insert_query=("""INSERT INTO user_profile (first_name, last_name, pwd, role, address, phone_number, id_proof, id_proof_type, is_active, last_usage_datetime, 
        created_datetime, email_address)
        VALUES ( %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""")
        records=(first_name, last_name, pwd, role, address, phone_number, id_proof, id_proof_type, is_active, last_usage_datetime, created_datetime, email_address)
        curr.execute(insert_query,records)
        conn.commit()
        curr.close()
    return True


def track_ride_dao(vehicle_num):

    conn = get_connection()
    curr = conn.cursor()
 

    curr.execute(f"""SELECT v.vehicle_id, v.vehicle_number, case when vu.vehicle_usage_enddate is not null then vu.vehicle_usage_enddate else 
    vehicle_use_startdate end as last_used_on, s.station_name, cvu.user_id as last_used_by_id, CONCAT(up.first_name,' ',up.last_name)
  as last_used_by_name FROM vehicle v join vehicle_usage vu on v.vehicle_id = vu.vehicle_id join customer_vehicle_usage cvu on vu.vehicle_id = cvu.vehicle_id join 
  user_profile up on cvu.user_id = up.user_id join station s on s.station_id = vu.vehicle_current_station_id where v.vehicle_number = '{vehicle_num}';""")

    track_dict = {}
    for row in curr.fetchall():
        print(row, type(row))
        track_dict["vehicle_id"] = row[0]
        track_dict["vehicle_number"] = row[1]
        track_dict["last_used_on"] = row[2]
        track_dict["vehicle_current_station_id"] = row[3]
        track_dict["last_used_by_id"] = row[4]
        track_dict["last_used_by_name"] = row[5]

    curr.close()
    conn.close()

    return track_dict


def complete_task_dao(user_id, issue_id, issue_type):
    conn = get_connection()
    curr = conn.cursor()
    query = """ UPDATE vehicle_issue
              SET issue_active =  'N' ,
                  issue_rectified_on  = now(),   
                  issue_rectified_by = '{}'
              WHERE issue_id = '{}' """.format(user_id,issue_id)
    curr.execute(query)
    if(issue_type == "Vehicle Movement"):
        select_query = """select current_station, move_to_station, vehicle_id from vehicle_issue where issue_id = '{}'""".format(issue_id)
        curr.execute(select_query)
        for row in curr.fetchall():
            current_station = row[0]
            move_to_station = row[1]
            vehicle_id = row[2]

        sql2 = "UPDATE vehicle_usage SET vehicle_current_station_id = {} where vehicle_id = {}".format(move_to_station, vehicle_id)
        curr.execute(sql2)       
        conn.commit()

        sql4 = "UPDATE station SET no_of_vehicles = no_of_vehicles - {} where station_id = {}".format(1, current_station)
        curr.execute(sql4)       
        conn.commit()

        sql4 = "UPDATE station SET no_of_vehicles = no_of_vehicles + {}  where station_id = {}".format(1, move_to_station)
        curr.execute(sql4)

    curr.close()
    conn.commit()
    conn.close()

    return True

#update_operator("AECS Layout, D Block", '997212458', None, None, 5 )

#insert_operator('New','Customer','abc','C','202 Thruso','123456789','pass123','passport','rnc@gmail.com')

#complete_task(1, 36, 'Vehicle Movement')

#track_ride_dao("RX450p")
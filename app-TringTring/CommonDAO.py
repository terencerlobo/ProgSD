from Config.DBConnection import *
import json
from NameValuePair import NameValuePair

def login_dao(email_address, pwd):
    
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    user = "SELECT email_address, pwd FROM USER_PROFILE"

    cursor.execute(user)

    count = 0

    for record in cursor.fetchall():
        if record[0] == email_address:
            user_id = record[0]
            print(user_id)
            pas = "SELECT pwd, user_id, role FROM USER_PROFILE WHERE EMAIL_ADDRESS = '" + email_address+"';"
            count = 1
            break

    
    if count == 1:
        cursor.execute(pas)
        for record in cursor.fetchall():
            if record[0] == pwd:
                is_returned_query = """select is_returned from customer_vehicle_usage where user_id = '""" + str(record[1]) + """';"""
                cursor.execute(is_returned_query)
                is_returned = 'Y'
                for isReturnedRecord in cursor.fetchall():
                    is_returned = isReturnedRecord[0]    
                response = {'login_status': 'Success', 'user_id': record[1], 'role': record[2], 'is_returned' : is_returned}
            else:
                response = {'login_status': 'Wrong Password', 'user_id': 'Blank'}
    else:
        response = {'login_status': 'Wrong Email', 'user_id': 'Blank'}
    conn.commit()
    cursor.close()
    conn.close()
    return response



def load_data_dao(user_id):
    conn = get_connection()
    curr = conn.cursor()
    
    query = """select up.first_name || ' ' || up.last_name, e.wallet_amount from user_profile up  left 
    join ewallet e on up.user_id = e.user_id  where up.user_id  = '""" + str(user_id) + """';"""
    curr.execute(query)
    response = {};
    for record in curr.fetchall():
        response["user_name"] = record[0]
        response["ewallet_amount"] = str(record[1])
    print(response, " ==> response")
    conn.commit()
    curr.close()

    conn.close()
    return response

def load_rent_data_dao(user_id):
    conn = get_connection()
    curr = conn.cursor()
    
    query = """select up.first_name || ' ' || up.last_name, e.wallet_amount from user_profile up  left 
    join ewallet e on up.user_id = e.user_id  where up.user_id  = '""" + str(user_id) + """';"""
    curr.execute(query)
    response = {};
    for record in curr.fetchall():
        response["user_name"] = record[0]
        response["ewallet_amount"] = str(record[1])
    print(response, " ==> response")
    conn.commit()
    curr.close()

    conn.close()
    return response


def fetch_station_names():
    conn = get_connection()
    curr = conn.cursor()
    station = "SELECT * FROM STATION"
    curr.execute(station)
    name_value_pair_list = []
    for record in curr.fetchall():
        name = record[1]
        value = record[0]
        #json.dumps
        name_value_pair = NameValuePair(name, value)
        name_value_pair_list.append(name_value_pair)
    
    res = [nvp.to_json() for nvp in name_value_pair_list]
        
    print(res)
    conn.commit()
    curr.close()

    conn.close()
    return res



fetch_station_names()

#print(login_dao('newoperator2@tringtring.com', 'sdf'))
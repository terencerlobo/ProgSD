from Config.DBConnection import *

def login_cust(email_address, pwd):
    
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    user = "SELECT email_address, pwd FROM USER_PROFILE"

    cursor.execute(user)

    count = 0

    for record in cursor.fetchall():
        print("Comes here.. ")
        print(record)
        if record[0] == email_address:
            user_id = record[0]
            print(user_id)
            pas = "SELECT pwd FROM USER_PROFILE WHERE EMAIL_ADDRESS = '" + email_address+"';"
            count = 1
            break

    
    if count == 1:
        cursor.execute(pas)
        for record in cursor.fetchall():
            if record[0] == pwd:
                response = {'login_status': 'Success'}
            else:
                response = {'login_status': 'Wrong_Password'}
    else:
        response = {'login_status': 'Wrong_Email'}
    conn.commit()
    cursor.close()
    conn.close()
    return response


print(login_cust('newoperaktor2@tringtring.com', 'sdf'))
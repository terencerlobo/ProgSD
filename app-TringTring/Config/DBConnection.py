import psycopg2
import psycopg2.extras
from credfile import HOST, DATABASE, USER, PASSWORD, PORT_ID
  
def get_connection():
    host=HOST
    database=DATABASE
    user=USER
    password=PASSWORD
    port_id=PORT_ID
    try:
        return psycopg2.connect(
            database=DATABASE,
            user=USER,
            password=PASSWORD,
            host=HOST,
            port=PORT_ID,
        )
    except:
        return False
  


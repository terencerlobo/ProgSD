import datetime
from select import select
from Config.DBConnection import *
import matplotlib.pyplot as plt
import pandas as pd

from NameValuePair import NameValuePair
import json


def fetch_operator():
    conn = get_connection()
    curr = conn.cursor()
    select_query = """select email_address ||'(' || first_name || ' ' || last_name|| ')' as display, email_address as value from user_profile where role = 'O' """
    curr.execute(select_query)
    name_value_pair_list = []

    for record in curr.fetchall():
        name = record[1]
        value = record[0]
        #json.dumps
        name_value_pair = NameValuePair(name, value)
        name_value_pair_list.append(name_value_pair)
    
    res = [nvp.to_json() for nvp in name_value_pair_list]
    print(res)
    conn.close()
    
    return res



#name_value_pair_list = fetch_operator()
#default dic library


def fetch_operator_perf_data(start_date, to_date, operator_email):
    select_query = """select count(*), date_trunc('day', vi.issue_rectified_on) issue_rectified_on  from vehicle_issue vi  
    where issue_rectified_on >= '"""+start_date+"""' and issue_rectified_on <= '"""+to_date+"""' 
    and issue_rectified_by  in (select user_id from user_profile where email_address = '"""+operator_email+"""') group by date_trunc('day', vi.issue_rectified_on);"""

    conn = get_connection()
    curr = conn.cursor()
    print(select_query)
    curr.execute(select_query)
    date_list = []
    count_list = []

    for record in curr.fetchall():
        x_date = record[1].strftime('%m/%d/%Y')
        y_count = record[0]
        date_list.append(x_date)
        count_list.append(y_count)

    date_time = {}
    date_time["Date"] = date_list
    date_time["Count"] = count_list
    df = pd.DataFrame.from_dict(date_time)

    #plt.barh(y=df["Count"], width=df["Date"])

    plt.pie(count_list, labels = date_list, startangle = 90)
    plt.show()
    conn.close()



fetch_operator_perf_data('2022-11-03', '2022-11-08','newoperator2@tringtring.com')
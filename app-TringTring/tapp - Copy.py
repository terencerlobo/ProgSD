from flask import Flask, request
import psycopg2
import psycopg2.extras
from credfile import HOST, DATABASE, USER, PASSWORD, PORT_ID
import json
from datetime import datetime
from flask import Flask, jsonify, request
from CustomerProfile import *
from OperatorReport import fetch_operator, fetch_operator_perf_data
from VehicleReport import *
from flask_cors import CORS
from CustomerDAO import *

app = Flask(__name__)
CORS(app)


def get_connection():
    try:
        print("Connecting")
        conn = psycopg2.connect(
                host=HOST,
                database=DATABASE,
                user=USER,
                password=PASSWORD,
                port=PORT_ID)
            
        print("Connection Established!")
    except Exception as e:
        print(e)


@app.route('/vtr/', methods = ['POST'])
def vehicle_type_report():
    print("Here inside vehicle_type_report..")
    print(request, " ==> This is the request json..")
    content = request.json
    from_date = content['from_date'].split(":")[1]
    to_date = content['to_date'].split(":")[1]
    vehicle_type = content['vehicle_type']
    generate_vehiclerevenue_report(from_date, to_date, vehicle_type)
    response = {'vtr_report_generation_status': 'Success'}
    return jsonify(response), 200


@app.route('/vocr/', methods = ['POST'])
def vehicle_operational_cost_report():
    content = request.json
    from_date = content['from_date'].split(":")[1]
    to_date = content['to_date'].split(":")[1]
    vehicle_type = content['vehicle_type']
    generate_vehicleoperationalcost_report(from_date, to_date, vehicle_type)
    response = {'vocr_report_generation_status': 'Success'}
    return jsonify(response), 200


@app.route('/fol/', methods = ['GET'])
def fetch_operator_list():
    response = fetch_operator()
    print(response, " ==> Here..")
    return response

@app.route('/fpd/', methods = ['POST'])
def fetch_perf_data():
    content = request.json
    from_date = content['from_date'].split(":")[1]
    to_date = content['to_date'].split(":")[1]
    operator_email = content['operator_email']
    fetch_operator_perf_data(from_date, to_date, operator_email)
    response = {'fpd_report_generation_status': 'Success'}
    return jsonify(response), 200


@app.route('/vehicle-list', methods=['POST'])
def vehicle_list():
    
    content = request.json
    station_id = content['station_id']
        
    response = fetch_vehicle_list(station_id)
    
    return response

@app.route('/report-vehicle', methods=['POST'])
def report_vehicle():
    '''
    Input - issue_type, user_id, vehicle_id, issue_description, vehicle_image, timestamp

    Inserts a record into the vehicle_issue table with the reported vehicle
    '''
    content = request.json
    vehicle_number = content['vehicle_number']
    issue_type = content['issue_type']
    issue_description = content['issue_description']
    from_station = content['from_station']
    priority = content['priority']
    report_vehicle_dao(vehicle_number, issue_type, issue_description, from_station, priority)
    response = {'report_issue': 'Success'}
    return jsonify(response), 200

@app.route('/mv', methods=['POST'])
def move_vehicle():
    
    content = request.json
    print(content)
    #from_station, to_station, vehicles
        
    move_vehicle_dao(content['from_station'], content['to_station'], content['vehicles'])
    response = {'move_vehicle': 'Success'}
    
    return response

if __name__=='__main__':
    # Development Mode
    app.run()

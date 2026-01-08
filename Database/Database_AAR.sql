/*This script in combination with the python script "AAR_excel_to_sql" and the excel file
"" creates the SQL database necessary for the AAR compatibility software*/
----------------------------------------------------------------------------------
CREATE DATABASE aar_comp_2;


/*The tabel with all tankers*/
CREATE TABLE IF NOT EXISTS tankers(
	ID SERIAL PRIMARY KEY,
	"nation" INT,
	"type" INT,
	"model" INT	
);

SELECT setval('tankers_id_seq', (SELECT MAX(id) FROM tankers));

----------------------------------------------------------------------------------
/*The table with all the receivers*/
CREATE TABLE IF NOT EXISTS receivers(
	ID SERIAL PRIMARY KEY,
	"nation" INT,
	"type" INT,
	"model" INT
);


SELECT setval('receivers_id_seq', (SELECT MAX(id) FROM receivers));

----------------------------------------------------------------------------------
/*This table is not in the excel file and creates all possible combinations of tanker and receiver*/
CREATE TABLE IF NOT EXISTS compatibility(
	id SERIAL PRIMARY KEY,	
	tanker_id INTEGER NOT NULL REFERENCES tankers(id) ON DELETE CASCADE,
	receiver_id INTEGER NOT NULL REFERENCES receivers(id) ON DELETE CASCADE,
	UNIQUE (tanker_id, receiver_id));

SELECT setval('compatibility_id_seq', (SELECT MAX(id) FROM compatibility));

INSERT INTO compatibility (tanker_id, receiver_id)
	SELECT t.id, r.id
	FROM tankers t
	CROSS JOIN receivers r
	ON CONFLICT (tanker_id, receiver_id) DO NOTHING;
	
DROP TABLE IF EXISTS specifications;---------------------------------------------------------------------------------
CREATE TABLE specifications (
    id SERIAL PRIMARY KEY,
    compatibility_id INT NOT NULL REFERENCES compatibility(id) ON DELETE CASCADE,
	c_tanker TEXT,
	c_receiver TEXT,
	v_srd_tanker TEXT,
	v_srd_receiver TEXT,
    boom_pod_BDA TEXT,
    min_alt INT,
    max_alt INT,
    min_as INT,
    max_as_kcas INT,
	max_as_m INT,
    fuel_flow_rate INT,
    notes TEXT
);


INSERT INTO specifications (compatibility_id, c_tanker, c_receiver, boom_drogue, min_alt, max_alt, min_as, max_as, fuel_flow_rate, notes)
SELECT c.id, s.boom_drogue, s.min_alt, s.max_alt, s.min_as, s.max_as, s.fuel_flow_rate, s.notes
FROM specifications s
JOIN tankers t 
	ON s.tanker_model = t.model 
	AND s.tanker_nation = t.nation
JOIN receivers r 
	ON s.receiver_model = r.model 
	AND s.receiver_nation = r.nation
JOIN compatibility c 
	ON c.tanker_id = t.id 
	AND c.receiver_id = r.id;
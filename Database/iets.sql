
/*This script in combination with the python script "AAR_excel_to_sql" and the excel file
"" creates the SQL database 


CREATE TABLE IF NOT EXISTS Tankers(
ID SERIAL PRIMARY KEY
);

SELECT setval('Tankers_id_seq', (SELECT MAX(id) FROM Tankers));

CREATE TABLE IF NOT EXISTS Receivers(
ID SERIAL PRIMARY KEY
);

SELECT setval('Receivers_id_seq', (SELECT MAX(id) FROM Receivers));

CREATE TABLE IF NOT EXISTS compatibility(
	id SERIAL PRIMARY KEY,	
	tanker_id INTEGER NOT NULL REFERENCES Tankers(id) ON DELETE CASCADE,
	receiver_id INTEGER NOT NULL REFERENCES Receivers(id) ON DELETE CASCADE,
	UNIQUE (tanker_id, receiver_id)

SELECT setval('compatibility_id_seq', (SELECT MAX(id) FROM compatibility));

INSERT INTO compatibility (tanker_id, receiver_id)
	SELECT t.id, r.id
	FROM tankers t
	CROSS JOIN receivers r
	ON CONFLICT (tanker_id, receiver_id) DO NOTHING;

CREATE TABLE IF NOT EXISTS Specifications(
	ID SERIAL PRIMARY KEY
)

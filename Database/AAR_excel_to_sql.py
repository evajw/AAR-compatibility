import pandas as pd 
import os
from sqlalchemy import create_engine, text

engine = create_engine('postgresql://postgres:ikwillerencoderen156@localhost:5432/aar_comp_2')
BASE_DIR = os.path.dirname(__file__)
excel_path = os.path.join(BASE_DIR, "AAR_matrix_2.xlsx")

# Define the table creation SQL as a string in Python
# This acts as a backup in case the Docker init script didn't run
create_tables_sql = """
CREATE TABLE IF NOT EXISTS tankers(ID SERIAL PRIMARY KEY, nation TEXT, type TEXT, model TEXT);
CREATE TABLE IF NOT EXISTS receivers(ID SERIAL PRIMARY KEY, nation TEXT, type TEXT, model TEXT);
CREATE TABLE IF NOT EXISTS compatibility (
    id SERIAL PRIMARY KEY,  
    tanker_id INTEGER NOT NULL REFERENCES tankers(id) ON DELETE CASCADE,
    receiver_id INTEGER NOT NULL REFERENCES receivers(id) ON DELETE CASCADE,
    UNIQUE (tanker_id, receiver_id));
"""

#Reading the excel sheets
tankers_excel = pd.read_excel(excel_path, sheet_name=0)
receivers_excel = pd.read_excel(excel_path, sheet_name=1)
specifications_excel = pd.read_excel(excel_path, sheet_name=2)

with engine.begin() as conn:
    # 1. Ensure tables exist (Safety first!)
    conn.execute(text(create_tables_sql))

<<<<<<< HEAD
print("excel-tabbladen succesvol naar PostgreSQL geschreven!")
=======
    # 2. Clear old data (optional, but prevents duplicates if not using unique constraints)
    conn.execute(text("TRUNCATE tankers, receivers, compatibility RESTART IDENTITY CASCADE;"))

    # 3. #Adapating the  tankers and receivers excel sheets to SQL
    tankers_excel.to_sql('tankers', conn, if_exists='append', index=False)
    receivers_excel.to_sql('receivers', conn, if_exists='append', index=False)

    # 4. #Before adding the specifications sheet trigger the compatibility logic
    print("Generating compatibility matrix...")
    conn.execute(text("""
        INSERT INTO compatibility (tanker_id, receiver_id)
        SELECT t.id, r.id
        FROM tankers t
        CROSS JOIN receivers r
        ON CONFLICT (tanker_id, receiver_id) DO NOTHING;
    """))

    # 1. Get the generated IDs back from the database into DataFrames
    df_tankers = pd.read_sql("SELECT id as tanker_id, nation, type, model FROM tankers", conn)
    df_receivers = pd.read_sql("SELECT id as receiver_id, nation, type, model FROM receivers", conn)
    df_comp = pd.read_sql("SELECT id as compatibility_id, tanker_id, receiver_id FROM compatibility", conn)

    # 2. Merge Specifications with Tanker IDs
    # Assuming Excel columns are: 'tanker_nation', 'tanker_type', 'tanker_model'
    specs_with_ids = specifications_excel.merge(
        df_tankers, 
        left_on=['tanker_nation', 'tanker_type', 'tanker_model'], 
        right_on=['nation', 'type', 'model']
    )

    # 3. Merge with Receiver IDs
    specs_with_ids = specs_with_ids.merge(
        df_receivers, 
        left_on=['receiver_nation', 'receiver_type', 'receiver_model'], 
        right_on=['nation', 'type', 'model']
    )

    # 4. Merge with Compatibility IDs
    final_specs = specs_with_ids.merge(
        df_comp, 
        on=['tanker_id', 'receiver_id']
    )

    # 5. Select only the columns that match your SQL table 'specifications'
    columns_to_keep = [
        'compatibility_id', 'c_tanker', 'c_receiver', 'v_srd_tanker', 
        'v_srd_receiver', 'boom_pod_bda', 'min_alt', 'max_alt', 
        'min_as', 'max_as_kcas', 'max_as_m', 'fuel_flow_rate', 'notes'
    ]

    # 6. Upload the cleaned data
    final_specs[columns_to_keep].to_sql('specifications', conn, if_exists='append', index=False)

    # 5. Upload the specifications table at the end, now that the compatibility exists
    #specifications_excel.to_sql('specifications', conn, if_exists='append', index=False)

print("Excel-sheets succesfully written to SQL!")
>>>>>>> backend

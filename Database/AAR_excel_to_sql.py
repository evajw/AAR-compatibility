import pandas as pd 
import os
from sqlalchemy import create_engine

engine = create_engine('postgresql://postgres:ikwillerencoderen156@localhost:5432/aar_comp_2')
BASE_DIR = os.path.dirname(__file__)
excel_path = os.path.join(BASE_DIR, "AAR_matrix_2.xlsx")


#Het lezen van de tabellen in excel
tankers_excel = pd.read_excel(excel_path, sheet_name=0)
receivers_excel = pd.read_excel(excel_path, sheet_name=1)
specifications_excel = pd.read_excel(excel_path, sheet_name=2)

#Het omzetten van de tabellen om ze leesbaar te maken voor SQL
tankers_excel.to_sql('tankers', engine, if_exists='append', index=False)
receivers_excel.to_sql('receivers', engine, if_exists='append', index=False)
specifications_excel.to_sql('specifications', engine, if_exists='append', index=False)

print("excel-tabbladen succesvol naar PostgreSQL geschreven!")

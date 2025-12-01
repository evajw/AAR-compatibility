import pandas as pd 
from sqlalchemy import create_engine

engine = create_engine('postgresql://postgres:ikwillerencoderen156@localhost:5432/AAR_comp_2')

#Het lezen van de tabellen in excel
tankers_excel = pd.read_excel(r"C:\Users\ejwes\Documents\DC\Project_AAR\Database\AAR_matrix.xlsx", sheet_name=0)
receivers_excel = pd.read_excel(r"C:\Users\ejwes\Documents\DC\Project_AAR\Database\AAR_matrix.xlsx", sheet_name=1)
specifications_excel = pd.read_excel(r"C:\Users\ejwes\Documents\DC\Project_AAR\Database\AAR_matrix.xlsx", sheet_name=2)

#Het omzetten van de tabellen om ze leesbaar te maken voor SQL
tankers_excel.to_sql('tankers', engine, if_exists='append', index=False)
receivers_excel.to_sql('receivers', engine, if_exists='append', index=False)
specifications_excel.to_sql('specifications', engine, if_exists='append', index=False)

print("excel-tabbladen succesvol naar PostgreSQL geschreven!")
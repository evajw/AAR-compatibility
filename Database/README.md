# The excel file

The excel "AAR_matrix.xlsx" will be the base for the database. This is the original data which, when finished should be uploaded to the SQL database. Then, in SQL additions and changes can be made and this file will become redundant.

The excel file is based on all national SRD's.

I think it is best to just all work in the "specifications sheet"
Don't change the order of the sheets! The "AAR_excel_to_SQL.py" file directly reads the excel sheets and converts it to an SQL database. If you switch the order of the sheets, python reads it as a different table.

Run the "AAR_excel_to_SQL.py" file for the excel database to upload to the sql database in docker. For this to run you have to have the python modules installed as given in the [main README](README.md). It might be the case that you only have these modules installed locally on your laptop. By running the same blocks of code again in your terminal in visual studio code in the directory of your python file, the modules can also be found for docker.

```VSC python terminal
pip install pandas
pip install sqlalchemy
pip install psycopg binary
pip install openpyxl
```

If you are working on one of the SRD's: please comment here. This way we can prevent people doing redundant work or ruining other work. Make sure that you know how far you are. Pherhaps it is also an idea, to first work in a seperate sheet and then add the complete sheet when you are sure that it is finished!
## Tankers and Receivers

| SRD           | Responsible | Done?   |
|---------------|-------------|---------|
| Australia     | Eva         | No
| Canada        |             | 
| MMF           | Mike        | Yes
| USA           | Mike        | No. Only start with KC-135 



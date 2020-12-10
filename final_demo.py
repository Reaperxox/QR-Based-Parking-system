from tkinter import *
from tkinter import messagebox
import urllib.request, json 
root=Tk()

#--list_db for storing data from json file (UID)---------
list_db=[]


#----function to match the 'va' variable---------
def getvals():
    va=park_value.get()
    if va in list_db:
        messagebox.showinfo('Login status',message='SUCCESSFUL')
    else:
        messagebox.showinfo('Login status',message='UNSUCCESSFULL')

#----Basic Layout syntax--------------------------
root.geometry('444x223')
root.title('Encoding software')
park=Label(root,text="Parking_Number")
park.grid(row=1,column=0)
park_value=StringVar()
user=Entry(root,textvariable=park_value)
user.grid(row=1,column=1)
Button(text="Submit", command=getvals).grid(row=2,column=1)
#-------------JSON FILE CHECKING---------------------

with urllib.request.urlopen("https://parking-e5259.firebaseio.com/park.json?&auh=GsHRcAZhab3K7KnRiCMK5UZ5zCSrwdlP7PcB67L2") as url:
    data = json.loads(url.read().decode())
    #print(data)
    for i in data:
        list_db.append(i)
#-------------------------------------------------------


print(list_db)
root.mainloop()
#------End layout screen--------------------------------

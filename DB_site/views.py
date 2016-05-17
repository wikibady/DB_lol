#-*- coding:utf-8 -*-
from django.http import HttpResponse
from django.shortcuts import render
from django.http import *
from django.shortcuts import render_to_response
from django.views.decorators.csrf import csrf_exempt
import sys
import MySQLdb
def index(request):
	return render_to_response('index.html')
def ajax_select(request):
	reload(sys)
	sys.setdefaultencoding('utf8')
	Id=request.GET['id']
	level=request.GET['level']
	name=request.GET['name']
	duanwei=request.GET['duanwei']
	daqu=request.GET['daqu']

	#str=daqu+"大区"+level+"的玩家"+name+"(ID"+Id+")的段位为"+duanwei+"!"

	conn = MySQLdb.connect(#建立一个连接，命名为conn
               host = 'localhost',#主机
               user = 'root',#本地用户
               passwd = 'root',#密码
               db = 'db_site',#连接数据库名
               charset="utf8"
        )
	cur = conn.cursor()
	sql = "SELECT * FROM db_site_user left join db_site_shengchang on(db_site_user.id=db_site_shengchang.userid_id) "
	where="WHERE"
	if Id:#精确查找
		where="WHERE db_site_user.id='"+Id+"'"
		sql+=where
	else:#条件查找
		where+=" daqu_id= (SELECT id FROM db_site_daqu WHERE id='"+daqu+"')"
		if level:
			where+=" AND level='"+level+"'"
		if duanwei:
			where+=" AND duanwei_id='"+duanwei+"'"
		if name:
			where+=" AND name='"+name+"'"
		sql+=where
	try:
		cur.execute(sql)
	except:
		Str="SQL ERR1"
	else:
		try: 
			su=cur.fetchall()
			
			su=list(su)
		except:
			Str="SQL ERR2"
		else:
			Str=""
			for i in range(len(su)):
				Str+="{"+"\"id\":\""+str(su[i][0])+"\","+"\"name\":\""+str(su[i][1])+"\","+"\"level\":\""+str(su[i][2])+"\","+"\"duanwei\":\""+str(su[i][3])+"\","+"\"zongchangci\":\""+str(su[i][6])+"\","+"\"shengchang\":\""+str(su[i][7])+"\","+"\"daqu\":\""+str(su[i][4])+"\"},"
			Str="["+Str+"]"
			#Str="[{"+"\"id\":\""+str(su[0])+"\","+"\"name\":\""+str(su[1])+"\","+"\"level\":\""+str(su[2])+"\","+"\"duanwei\":\""+str(su[3])+"\","+"\"zongchangci\":\""+str(su[4])+"\","+"\"shengchang\":\""+str(su[5])+"\","+"\"daqu\":\""+daqu+"\"}]"
	json="{\"sql\":\""+sql+"\",\"people\":"+Str+"}"

	cur.close()
	conn.close()

	#ty=type(cur.execute(sql))
	
	#Str+=cur.fetchone();
	#Str+=cur.fetchone();
	return HttpResponse(json)

def ajax_add(request):
	reload(sys)
	sys.setdefaultencoding('utf8')
	
	level=request.GET['level']
	name=request.GET['name']
	duanwei=request.GET['duanwei']
	daqu=request.GET['daqu']
	zongchangci=request.GET['zongchangci']
	shengchang=request.GET['shengchang']

	#str=daqu+"大区"+level+"的玩家"+name+"(ID"+Id+")的段位为"+duanwei+"!"

	conn = MySQLdb.connect(#建立一个连接，命名为conn
               host = 'localhost',#主机
               user = 'root',#本地用户
               passwd = 'root',#密码
               db = 'db_site',#连接数据库名
               charset="utf8"
        )
	cur = conn.cursor()
	#//'霍霍霍霍', '30', '3', '3')"
	#sql1="INSERT INTO db_site_user(id,name) VALUES(NULL,\"adb\")"
	sql1 = "INSERT INTO db_site_user(id,name,level,duanwei_id,daqu_id) VALUES (NULL,\""+name+"\",\""+level+"\",\""+duanwei+"\",\""+daqu+"\")"
	#sql2 = "INSERT INTO db_site.db_site_shengchang (id, zongchangci, huochengchangci, userid_id) VALUES (NULL,\""+zongchangci+"\",\""+shengchang+"\",\""+id+"\")"
	cur.execute(sql1)
	conn.commit()
	sql1_find="SELECT id FROM db_site_user WHERE name=\""+name+"\""
	cur.execute(sql1_find)
	su=cur.fetchall()
	su=list(su)
	sql2 = "INSERT INTO db_site.db_site_shengchang (id, zongchangci, huochengchangci, userid_id) VALUES (NULL,\""+zongchangci+"\",\""+shengchang+"\",\""+str(su[0][0])+"\")"
	cur.execute(sql2)
	cur.close()
	conn.commit()
	conn.close()

	#ty=type(cur.execute(sql))
	json="ss"
	#Str+=cur.fetchone();
	#Str+=cur.fetchone();
	return HttpResponse(json)


def ajax_delete(request):
	reload(sys)
	sys.setdefaultencoding('utf8')
	Id=request.GET['id']
	sql=request.GET['sql']

	#str=daqu+"大区"+level+"的玩家"+name+"(ID"+Id+")的段位为"+duanwei+"!"

	conn = MySQLdb.connect(#建立一个连接，命名为conn
               host = 'localhost',#主机
               user = 'root',#本地用户
               passwd = 'root',#密码
               db = 'db_site',#连接数据库名
               charset="utf8"
        )
	cur = conn.cursor()
	sql1="DELETE FROM db_site_user WHERE id=\""+Id+"\""
	cur.execute(sql1)
	conn.commit()
	sql2="DELETE FROM db_site_shengchang WHERE userid_id=\""+Id+"\""
	cur.execute(sql2)
	conn.commit()
	try:
		cur.execute(sql)
	except:
		Str="SQL ERR1"
	else:
		try: 
			su=cur.fetchall()
			
			su=list(su)
		except:
			Str="SQL ERR2"
		else:
			Str=""
			for i in range(len(su)):
				Str+="{"+"\"id\":\""+str(su[i][0])+"\","+"\"name\":\""+str(su[i][1])+"\","+"\"level\":\""+str(su[i][2])+"\","+"\"duanwei\":\""+str(su[i][3])+"\","+"\"zongchangci\":\""+str(su[i][6])+"\","+"\"shengchang\":\""+str(su[i][7])+"\","+"\"daqu\":\""+str(su[i][4])+"\"},"
			Str="["+Str+"]"
			#Str="[{"+"\"id\":\""+str(su[0])+"\","+"\"name\":\""+str(su[1])+"\","+"\"level\":\""+str(su[2])+"\","+"\"duanwei\":\""+str(su[3])+"\","+"\"zongchangci\":\""+str(su[4])+"\","+"\"shengchang\":\""+str(su[5])+"\","+"\"daqu\":\""+daqu+"\"}]"
	json="{\"sql\":\""+sql+"\",\"people\":"+Str+"}"

	cur.close()
	conn.close()

	#ty=type(cur.execute(sql))
	
	#Str+=cur.fetchone();
	#Str+=cur.fetchone();
	return HttpResponse(json)


def ajax_update(request):
	reload(sys)
	sys.setdefaultencoding('utf8')
	Id=request.GET['id']
	level=request.GET['level']
	name=request.GET['name']
	duanwei=request.GET['duanwei']
	daqu=request.GET['daqu']
	zongchangci=request.GET['zongchangci']
	shengchang=request.GET['shengchang']
	sql=request.GET['sql']
	#str=daqu+"大区"+level+"的玩家"+name+"(ID"+Id+")的段位为"+duanwei+"!"
	conn = MySQLdb.connect(#建立一个连接，命名为conn
               host = 'localhost',#主机
               user = 'root',#本地用户
               passwd = 'root',#密码
               db = 'db_site',#连接数据库名
               charset="utf8"
        )
	cur = conn.cursor()
	sql1 = "UPDATE db_site_user SET name=%s,level=%s,duanwei_id=%s,daqu_id=%s WHERE id=%s"%("\""+name+"\"","\""+level+"\"","\""+duanwei+"\"","\""+daqu+"\"","\""+Id+"\"")
	sql2 = "UPDATE db_site_shengchang SET zongchangci=%s,huochengchangci=%s WHERE userid_id=%s"%("\""+zongchangci+"\"","\""+shengchang+"\"","\""+Id+"\"")
	cur.execute(sql1)
	cur.execute(sql2)
	conn.commit()
	try:
		cur.execute(sql)
	except:
		Str="SQL ERR1"
	else:
		try: 
			su=cur.fetchall()
			
			su=list(su)
		except:
			Str="SQL ERR2"
		else:
			Str=""
			for i in range(len(su)):
				Str+="{"+"\"id\":\""+str(su[i][0])+"\","+"\"name\":\""+str(su[i][1])+"\","+"\"level\":\""+str(su[i][2])+"\","+"\"duanwei\":\""+str(su[i][3])+"\","+"\"zongchangci\":\""+str(su[i][6])+"\","+"\"shengchang\":\""+str(su[i][7])+"\","+"\"daqu\":\""+str(su[i][4])+"\"},"
			Str="["+Str+"]"
			#Str="[{"+"\"id\":\""+str(su[0])+"\","+"\"name\":\""+str(su[1])+"\","+"\"level\":\""+str(su[2])+"\","+"\"duanwei\":\""+str(su[3])+"\","+"\"zongchangci\":\""+str(su[4])+"\","+"\"shengchang\":\""+str(su[5])+"\","+"\"daqu\":\""+daqu+"\"}]"
	json="{\"sql\":\""+sql+"\",\"people\":"+Str+"}"

	cur.close()
	conn.close()

	#ty=type(cur.execute(sql))
	
	#Str+=cur.fetchone();
	#Str+=cur.fetchone();
	return HttpResponse(json)


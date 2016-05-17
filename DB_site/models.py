from __future__ import unicode_literals

from django.db import models

class daqu(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=10)
    
class duanwei(models.Model):
    id = models.AutoField(primary_key=True)
    duanwei= models.CharField(max_length=10)
    



class user(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20)
    level = models.IntegerField()
    daqu = models.ForeignKey(daqu)
    duanwei = models.ForeignKey(duanwei)
 
class shengchang(models.Model):
    id = models.AutoField(primary_key=True)
    userid=models.ForeignKey(user)
    zongchangci = models.IntegerField()
    huochengchangci = models.IntegerField()

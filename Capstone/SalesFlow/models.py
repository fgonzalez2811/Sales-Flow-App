from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
   pass

class YearSheet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_yearsheets")
    year = models.IntegerField(default=0)
    creation_date = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.year} / {self.user}"
    

class MonthSheet(models.Model):
    year_sheet = models.ForeignKey(YearSheet, on_delete=models.CASCADE, related_name="months")
    month = models.CharField(max_length=15, default=0)
    opt_goal = models.IntegerField(default=0)
    opt_current = models.IntegerField(default=0)
    sales_goal = models.IntegerField(default=0)
    sales_current = models.IntegerField(default=0)
    fact_goal = models.IntegerField(default=0)
    fact_current = models.IntegerField(default=0)
    efect_goal = models.IntegerField(default=0)
    efect_current = models.IntegerField(default=0)
    td_goal = models.IntegerField(default=0)
    td_current = models.IntegerField(default=0)



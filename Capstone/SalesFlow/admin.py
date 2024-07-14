from django.contrib import admin
from .models import User, MonthSheet, YearSheet

# Register your models here.
admin.site.register(User)
admin.site.register(YearSheet)
admin.site.register(MonthSheet)
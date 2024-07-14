
from django.urls import path

from . import views

urlpatterns = [
    path("", views.start, name="start"),
    path("<int:req_year>", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("register", views.register, name="register"),
    path("new_year", views.new_year, name="new_year"),
    path("logout", views.logout_view, name="logout"),
    path("edit_month_data", views.edit_month_data, name="edit_month_data"),
    path("delete_year/<str:year>", views.delete_year, name="delete_year"),
    path("excel", views.excel, name='excel'),
    path("get_monthsheet/<int:pk>", views.get_monthsheet, name='get_monthsheet')
]
# Generated by Django 5.0.6 on 2024-05-17 16:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("SalesFlow", "0002_alter_user_groups_alter_user_user_permissions"),
    ]

    operations = [
        migrations.AddField(
            model_name="monthsheet",
            name="efect_current",
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name="monthsheet",
            name="efect_goal",
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name="monthsheet",
            name="fact_current",
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name="monthsheet",
            name="fact_goal",
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name="monthsheet",
            name="month",
            field=models.CharField(default=0, max_length=15),
        ),
        migrations.AddField(
            model_name="monthsheet",
            name="opt_current",
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name="monthsheet",
            name="opt_goal",
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name="monthsheet",
            name="sales_current",
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name="monthsheet",
            name="sales_goal",
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name="yearsheet",
            name="year",
            field=models.IntegerField(default=0),
        ),
    ]

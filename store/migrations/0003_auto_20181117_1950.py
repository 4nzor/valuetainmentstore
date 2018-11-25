# Generated by Django 2.1.1 on 2018-11-17 16:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0002_auto_20181114_1944'),
    ]

    operations = [
        migrations.CreateModel(
            name='AricleImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='')),
            ],
        ),
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('background_color', models.CharField(max_length=6)),
            ],
        ),
        migrations.AddField(
            model_name='aricleimage',
            name='article',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='store.Article'),
        ),
    ]

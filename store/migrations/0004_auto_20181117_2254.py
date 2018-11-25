# Generated by Django 2.1.1 on 2018-11-17 19:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0003_auto_20181117_1950'),
    ]

    operations = [
        migrations.CreateModel(
            name='PrImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('image', models.ImageField(upload_to='')),
            ],
        ),
        migrations.AddField(
            model_name='product',
            name='images',
            field=models.ManyToManyField(to='store.PrImage'),
        ),
    ]

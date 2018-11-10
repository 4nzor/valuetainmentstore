from django.db import models


# Create your models here.
class Style(models.Model):

    style = models.CharField(max_length=200)
    def __str__(self):
        return self.style

class Sex(models.Model):
    sex = models.CharField(max_length=200)


class Size(models.Model):
    size = models.CharField(max_length=200)


class Category(models.Model):
    name = models.CharField(max_length=200)


class Product(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField()
    price = models.PositiveIntegerField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    size = models.ManyToManyField(Size)
    sex = models.ForeignKey(Sex, on_delete=models.CASCADE)
    style = models.ForeignKey(Style, on_delete=models.CASCADE)

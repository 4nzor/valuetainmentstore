from django.db import models


# Create your models here.
from django.utils.html import format_html


class Style(models.Model):
    style = models.CharField(max_length=200)

    def __str__(self):
        return self.style


class Sex(models.Model):
    sex = models.CharField(max_length=200)

    def __str__(self):
        return self.sex


class Size(models.Model):
    size = models.CharField(max_length=200)

    def __str__(self):
        return self.size


class Category(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Product(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField()
    price = models.PositiveIntegerField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    size = models.ManyToManyField(Size)
    sex = models.ForeignKey(Sex, on_delete=models.CASCADE)
    style = models.ForeignKey(Style, on_delete=models.CASCADE)

    def image_tag(self):
        return format_html('<img style="width:32px;height:32px" src="%s"/>' % self.image.url)

    image_tag.short_description = 'Image'
    image_tag.allow_tags = True

    def __str__(self):
        return self.title

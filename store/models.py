from PIL import Image
from django.db import models
from django.utils.html import format_html

from valuetainmentstore.local_settings import BASE_DIR


class Sex(models.Model):
    sex = models.CharField(max_length=200)

    def __str__(self):
        return self.sex


class Style(models.Model):
    style = models.CharField(max_length=200, blank=True, null=True)
    sex = models.ForeignKey(Sex, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.style

    def get_absolute_url(self):
        sex = Sex.objects.get(sex=self.sex)
        sex = str(sex.sex)
        return "/collections/{}/{}/".format(sex, self.style)


class Size(models.Model):
    size = models.CharField(max_length=200)

    def __str__(self):
        return self.size


class Category(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

    def image_tag(self):
        return format_html('<img style="width:32px;height:32px" src="%s"/>' % self.image.url)

    image_tag.short_description = 'Image'
    image_tag.allow_tags = True


class Product(models.Model):
    title = models.CharField(max_length=200)
    price = models.PositiveIntegerField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    size = models.ManyToManyField(Size)
    sex = models.ForeignKey(Sex, on_delete=models.CASCADE)
    style = models.ForeignKey(Style, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class PrImage(models.Model):
    class Meta:
        verbose_name = 'Фото продукта'
        verbose_name_plural = 'Фото продукта'

    title = models.CharField(max_length=200)
    image = models.ImageField()
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='image')

    def get_color(self):
        im = Image.open(BASE_DIR + self.image.url)
        args = []
        from collections import Counter
        for i in im.getdata():
            if i == (255, 255, 255):
                pass
            else:
                args.append(i)

        temp = Counter(args)
        max_val = max(temp.values())
        for name, age in temp.items():
            if age == max_val:
                return name

    def __str__(self):
        return self.image.url

    def image_tag(self):
        if self.image.url:
            return format_html(
                '<img class="inline_show_image" style="width:32px;height:32px" src="%s"/>' % self.image.url)

    image_tag.short_description = 'Image'
    image_tag.allow_tags = True


class GuestUser(models.Model):
    ip = models.GenericIPAddressField()
    cookie = models.CharField(max_length=50)

    def __str__(self):
        return self.ip


class Order(models.Model):
    pass

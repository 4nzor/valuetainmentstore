from django.contrib import admin

# Register your models here.
from django.contrib.admin import ModelAdmin
from django.contrib.admin.helpers import AdminForm

from store.models import Product ,Category ,Style ,Sex ,Size

@admin.register(Product)
class AdminProduct(ModelAdmin):
    list_display = ['title', 'image_tag', 'category']

admin.site.register(Category)
admin.site.register(Style)
admin.site.register(Sex )
admin.site.register(Size)
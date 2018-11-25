from django.contrib import admin
# Register your models here.
from django.contrib.admin import ModelAdmin

from store.models import Product, Category, Style, Sex, Size, PrImage, GuestUser


class ProductImageInline(admin.TabularInline):
    readonly_fields = ['image_tag']
    model = PrImage


@admin.register(Product)
class AdminProduct(ModelAdmin):
    list_display = ['title', 'category']
    inlines = [ProductImageInline]
    class Media:
        js = (

            'store/js/admin_image.js',  # app static folder
        )


@admin.register(PrImage)
class AdminProductImage(ModelAdmin):
    list_display = ['title', 'image_tag']


admin.site.register(Category)
admin.site.register(Style)
admin.site.register(Sex)
admin.site.register(Size)
admin.site.register(GuestUser)

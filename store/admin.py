from django.contrib import admin

# Register your models here.
from store.models import Product ,Category ,Style ,Sex ,Size

admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Style)
admin.site.register(Sex )
admin.site.register(Size)
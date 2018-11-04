from django.db import models
import json


# Create your models here.

class FakeNews(models.Model):
    """Model representing a fakenews."""
    newsContent = models.TextField(help_text='Enter news content here')
    headline = models.CharField(max_length=200, help_text='Enter a headline')
    highlight1 = models.CharField(max_length=200, help_text='Enter highlight1')
    highlight2 = models.CharField(max_length=200, help_text='Enter highlight2', default=' ')
    date = models.DateTimeField()
    place = models.CharField(max_length=80, help_text='Enter the place', default=' ')
    author = models.CharField(max_length=50, help_text='Enter the author', default=' ')
    link = models.CharField(max_length=200, help_text='Enter a link', default=' ')
    imageCaption = models.CharField(max_length=100, help_text='Enter a caption', default=' ')
    imageUrl = models.URLField()

    class Meta:
        ordering = ['date']

    def set_foo(self, x):
        self.highlights = json.dumps(x)

    def get_foo(self):
        return json.loads(self.highlights)

    def __str__(self):
        return str(self.headline)

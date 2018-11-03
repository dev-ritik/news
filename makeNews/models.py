from django.db import models
import json


# Create your models here.

class FakeNews(models.Model):
    """Model representing a fakenews."""
    newsContent = models.TextField(help_text='Enter news content here')
    headline = models.CharField(max_length=200, help_text='Enter a headline')
    highlight1 = models.CharField(max_length=200, help_text='Enter highlight1', default=' ')
    highlight2 = models.CharField(max_length=200, help_text='Enter highlight2', default=' ')
    date = models.DateTimeField()
    link = models.CharField(max_length=200, help_text='Enter a link', default=' ')

    class Meta:
        ordering = ['date']

    def set_foo(self, x):
        self.highlights = json.dumps(x)

    def get_foo(self):
        return json.loads(self.highlights)

    def __str__(self):
        return str(self.headline)


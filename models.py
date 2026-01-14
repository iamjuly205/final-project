class Question(models.Model):
    # các field khác...
    grade = models.IntegerField(default=1)

    def is_get_score(self, selected_ids):
        correct_choices = self.choice_set.filter(is_correct=True)
        correct_ids = set(correct_choices.values_list('id', flat=True))
        return correct_ids.issubset(set(selected_ids))

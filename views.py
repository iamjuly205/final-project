from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from .models import Course, Lesson, Question, Choice, Submission


def submit(request, course_id):
    course = get_object_or_404(Course, pk=course_id)
    submission = Submission.objects.create(course=course)

    total_score = 0
    for key, value in request.POST.items():
        if key.startswith('choice_'):
            choice_id = int(value)
            choice = Choice.objects.get(pk=choice_id)
            submission.choices.add(choice)
            if choice.is_correct:
                total_score += choice.question.grade

    submission.score = total_score
    submission.save()

    return render(request, 'onlinecourse/exam_result.html', {
        'course': course,
        'score': total_score
    })


def show_exam_result(request, course_id, submission_id):
    course = get_object_or_404(Course, pk=course_id)
    submission = get_object_or_404(Submission, pk=submission_id)

    selected_ids = submission.choices.values_list('id', flat=True)

    total_score = 0
    possible_score = 0

    for question in course.question_set.all():
        possible_score += question.grade
        if question.is_get_score(selected_ids):
            total_score += question.grade

    context = {
        'course': course,
        'submission': submission,
        'selected_ids': selected_ids,
        'grade': total_score,
        'possible': possible_score,
    }

    return render(request, 'onlinecourse/exam_result_bootstrap.html', context)

// 1. هيكلة بيانات الطالب (Class & Constructor)
class Student {
    constructor(id, name, grades, attendance) {
        this.id = id;
        this.name = name;
        this.grades = grades; // مصفوفة من 3 درجات
        this.attendance = attendance; // نسبة الحضور
    }

    // 2. دوال التحليل الأكاديمي (Methods)
    
    // أ. حساب المتوسط باستخدام reduce
    calculateAverage() {
        const sum = this.grades.reduce((acc, grade) => acc + grade, 0);
        return sum / this.grades.length;
    }

    // ب. دالة التقدير باستخدام if/else
    getGrade() {
        const avg = this.calculateAverage();
        if (avg >= 90) return 'A';
        else if (avg >= 80) return 'B';
        else if (avg >= 70) return 'C';
        else if (avg >= 60) return 'D';
        else if (avg >= 50) return 'E';
        else return 'F';
    }

    // ج. دالة النتيجة النهائية (الشرطين)
    getFinalResult() {
        const avg = this.calculateAverage();
        if (avg >= 50 && this.attendance >= 75) {
            return "ناجح";
        } else {
            return "يحتاج مراجعة";
        }
    }
}

// 3. نظام تشغيل الجامعة (Objects Array)
// عرف مصفوفة رئيسية
const studentsList = [
    // قم بتخليق 4 كائنات، تأكد أن متوسط بعضهم بين 40 و 49
    new Student(1, "أحمد", [40, 45, 50], 80), // متوسط 45
    new Student(2, "سارة", [35, 40, 45], 60), // متوسط 40
    new Student(3, "محمد", [85, 90, 95], 90), // متوسط 90 (ناجح)
    new Student(4, "ليلى", [48, 42, 45], 70)  // متوسط 45
];

// 4. لجنة الرأفة (Array Methods)
// الاستخراج: filter
const strugglingStudents = studentsList.filter(student => {
    const avg = student.calculateAverage();
    return avg >= 40 && avg <= 49;
});

// المعالجة: map لإضافة 5 درجات
const curvedStudents = strugglingStudents.map(student => {
    // نضيف 5 درجات موزعة على المواد (أو يمكنك إضافتها لدرجة واحدة)
    // هنا نقوم بزيادة المتوسط مباشرة عن طريق تعديل الدرجات
    student.grades = student.grades.map(g => g + (5 / 3)); // توزيع الـ 5 درجات
    return student;
});

// التحليل: reduce لجمع المتوسطات
// مع "درع حماية" لمنع القسمة على صفر
const newOverallAverage = curvedStudents.length > 0 
    ? curvedStudents.reduce((acc, student) => acc + student.calculateAverage(), 0) / curvedStudents.length 
    : 0;

// 5. المخرجات (Console Logging)

console.log("=== تقرير الطلاب ===");
studentsList.forEach(student => {
    console.log(`الاسم: ${student.name} | المتوسط: ${student.calculateAverage().toFixed(2)} | التقدير: ${student.getGrade()} | النتيجة: ${student.getFinalResult()}`);
});

console.log("\n=== الطلاب المتعثرين الذين شملتهم الرأفة ===");
curvedStudents.forEach(student => {
    console.log(`الاسم: ${student.name} | المتوسط الجديد: ${student.calculateAverage().toFixed(2)}`);
});

console.log("\n=== متوسط درجات الطلاب المتعثرين بعد التعديل ===");
console.log(newOverallAverage.toFixed(2));
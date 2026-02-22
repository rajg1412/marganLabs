import { useState, useEffect } from "react";
import { Course, COURSES } from "@/data/courses";

interface UseCoursesResult {
    courses: Course[];
    loading: boolean;
}

export function useCourses(): UseCoursesResult {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCourses(COURSES);
            setLoading(false);
        }, 900);
        return () => clearTimeout(timer);
    }, []);

    return { courses, loading };
}

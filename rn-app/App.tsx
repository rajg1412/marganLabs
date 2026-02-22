import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Animated,
    Switch,
    SafeAreaView,
    Dimensions,
} from 'react-native';

const { width: SCREEN_W } = Dimensions.get('window');

const COURSES = [
    { id: '1', title: 'AI Fundamentals', progress: 0.6, category: 'AI', icon: '🤖' },
    { id: '2', title: 'Machine Learning Basics', progress: 0.2, category: 'ML', icon: '📊' },
    { id: '3', title: 'React for Beginners', progress: 0.9, category: 'Dev', icon: '💻' },
    { id: '4', title: 'Deep Learning with PyTorch', progress: 0.45, category: 'DL', icon: '🧠' },
    { id: '5', title: 'Natural Language Processing', progress: 0.1, category: 'NLP', icon: '💬' },
    { id: '6', title: 'Data Science & Analytics', progress: 0.75, category: 'DS', icon: '📈' },
];

function AnimatedProgressBar({ progress, dark }: { progress: number; dark: boolean }) {
    const animatedWidth = useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(animatedWidth, {
            toValue: progress,
            duration: 900,
            useNativeDriver: false,
        }).start();
    }, [progress]);

    const getColor = () => {
        if (progress >= 0.8) return '#10b981';
        if (progress >= 0.4) return '#6366f1';
        return '#ef4444';
    };

    return (
        <View style={[styles.trackBg, { backgroundColor: dark ? '#1e2d4a' : '#e8eeff' }]}>
            <Animated.View
                style={[
                    styles.trackFill,
                    {
                        backgroundColor: getColor(),
                        width: animatedWidth.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0%', '100%'],
                        }),
                    },
                ]}
            />
        </View>
    );
}

function CourseCard({ course, dark }: { course: typeof COURSES[0]; dark: boolean }) {
    const pct = Math.round(course.progress * 100);

    return (
        <TouchableOpacity
            activeOpacity={0.82}
            style={[
                styles.card,
                {
                    backgroundColor: dark ? '#131929' : '#ffffff',
                    borderColor: dark ? '#1e2d4a' : '#dde3f0',
                },
            ]}
        >
            <View style={styles.cardTop}>
                <View style={[styles.iconCircle, { backgroundColor: dark ? '#0f1629' : '#f0f4ff' }]}>
                    <Text style={styles.iconText}>{course.icon}</Text>
                </View>
                <View style={styles.titleBlock}>
                    <Text
                        style={[styles.courseTitle, { color: dark ? '#f1f5f9' : '#0f172a' }]}
                        numberOfLines={1}
                    >
                        {course.title}
                    </Text>
                    <View style={[styles.chip, { backgroundColor: dark ? '#1a2240' : '#e8eeff' }]}>
                        <Text style={[styles.chipText, { color: dark ? '#818cf8' : '#6366f1' }]}>
                            {course.category}
                        </Text>
                    </View>
                </View>
                <Text style={[styles.pctText, { color: dark ? '#f1f5f9' : '#0f172a' }]}>
                    {pct}%
                </Text>
            </View>

            <AnimatedProgressBar progress={course.progress} dark={dark} />

            <View style={styles.cardFooter}>
                <Text style={[styles.lessonCount, { color: dark ? '#475569' : '#94a3b8' }]}>
                    {pct === 0 ? 'Not started' : pct === 100 ? '✅ Completed' : `${pct}% complete`}
                </Text>
                <TouchableOpacity
                    style={[styles.continueBtn, { backgroundColor: dark ? '#1a2240' : '#ede9fe' }]}
                >
                    <Text style={[styles.continueBtnText, { color: dark ? '#818cf8' : '#6366f1' }]}>
                        {pct === 0 ? 'Start' : pct === 100 ? 'Review' : 'Continue'} →
                    </Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}

export default function App() {
    const [dark, setDark] = useState(false);

    const bg = dark ? '#0a0f1e' : '#f0f4ff';
    const surface = dark ? '#131929' : '#ffffff';
    const textPrimary = dark ? '#f1f5f9' : '#0f172a';
    const textSecondary = dark ? '#94a3b8' : '#475569';
    const border = dark ? '#1e2d4a' : '#dde3f0';

    const avgProgress = Math.round(
        (COURSES.reduce((s, c) => s + c.progress * 100, 0) / COURSES.length)
    );
    const completed = COURSES.filter((c) => c.progress === 1).length;
    const inProgress = COURSES.filter((c) => c.progress > 0 && c.progress < 1).length;

    return (
        <SafeAreaView style={[styles.root, { backgroundColor: bg }]}>
            <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} />

            <FlatList
                data={COURSES}
                keyExtractor={(c) => c.id}
                contentContainerStyle={styles.listContent}
                ListHeaderComponent={
                    <>
                        {/* Header */}
                        <View style={[styles.header, { borderBottomColor: border }]}>
                            <View>
                                <Text style={[styles.logoText, { color: textPrimary }]}>
                                    ⚡ Neuro<Text style={styles.logoAccent}>Learn</Text>
                                </Text>
                            </View>
                            <View style={styles.themeRow}>
                                <Text style={[styles.themeLabel, { color: textSecondary }]}>
                                    {dark ? '🌙' : '☀️'}
                                </Text>
                                <Switch
                                    value={dark}
                                    onValueChange={setDark}
                                    trackColor={{ false: '#dde3f0', true: '#4f46e5' }}
                                    thumbColor={dark ? '#818cf8' : '#ffffff'}
                                />
                            </View>
                        </View>

                        {/* Page title */}
                        <View style={styles.pageHeading}>
                            <Text style={[styles.pageTitle, { color: textPrimary }]}>
                                My Dashboard
                            </Text>
                            <Text style={[styles.pageSubtitle, { color: textSecondary }]}>
                                Continue your AI learning journey
                            </Text>
                        </View>

                        {/* Stats */}
                        <View style={[styles.statsCard, { backgroundColor: surface, borderColor: border }]}>
                            {[
                                { label: 'Total', value: COURSES.length, icon: '📚' },
                                { label: 'Avg', value: `${avgProgress}%`, icon: '📊' },
                                { label: 'Done', value: completed, icon: '✅' },
                                { label: 'Active', value: inProgress, icon: '⚡' },
                            ].map((s, i) => (
                                <View key={s.label} style={[
                                    styles.statItem,
                                    i < 3 && { borderRightWidth: 1, borderRightColor: border }
                                ]}>
                                    <Text style={styles.statIcon}>{s.icon}</Text>
                                    <Text style={[styles.statValue, { color: textPrimary }]}>{s.value}</Text>
                                    <Text style={[styles.statLabel, { color: textSecondary }]}>{s.label}</Text>
                                </View>
                            ))}
                        </View>

                        <Text style={[styles.subheading, { color: textPrimary }]}>Your Courses</Text>
                    </>
                }
                renderItem={({ item }) => <CourseCard course={item} dark={dark} />}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1 },
    listContent: { paddingBottom: 32 },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderBottomWidth: 1,
    },
    logoText: { fontSize: 18, fontWeight: '800' },
    logoAccent: { color: '#6366f1' },
    themeRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    themeLabel: { fontSize: 16 },

    pageHeading: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 12, gap: 4 },
    pageTitle: { fontSize: 24, fontWeight: '800', letterSpacing: -0.5 },
    pageSubtitle: { fontSize: 13 },

    statsCard: {
        flexDirection: 'row',
        marginHorizontal: 20,
        borderRadius: 14,
        borderWidth: 1,
        overflow: 'hidden',
        marginBottom: 24,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 14,
        gap: 2,
    },
    statIcon: { fontSize: 18 },
    statValue: { fontSize: 18, fontWeight: '800' },
    statLabel: { fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5 },

    subheading: { fontSize: 17, fontWeight: '700', paddingHorizontal: 20, marginBottom: 12 },

    card: {
        marginHorizontal: 20,
        marginBottom: 12,
        borderRadius: 14,
        borderWidth: 1,
        padding: 16,
        gap: 12,
    },
    cardTop: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    iconCircle: {
        width: 42,
        height: 42,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconText: { fontSize: 20 },
    titleBlock: { flex: 1, gap: 4 },
    courseTitle: { fontSize: 14, fontWeight: '700' },
    chip: {
        alignSelf: 'flex-start',
        borderRadius: 99,
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    chipText: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
    pctText: { fontSize: 15, fontWeight: '800' },

    trackBg: { height: 7, borderRadius: 99, overflow: 'hidden' },
    trackFill: { height: '100%', borderRadius: 99 },

    cardFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    lessonCount: { fontSize: 11 },
    continueBtn: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    continueBtnText: { fontSize: 12, fontWeight: '700' },
});

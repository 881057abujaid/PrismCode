import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { getProjects } from "../../services/project.service";
import { getProjectReviews } from "../../services/review.service";
import Loader from "../../components/common/Loader";
import ReviewWorkspace from "../../components/reviews/ReviewWorkspace";
import {
    AlertTriangle,
    ChevronRight,
    Clock,
    Code2,
    Folder,
    Lock,
    Plus,
    ShieldCheck,
    TrendingUp,
    Zap,
} from "lucide-react";
import toast from "react-hot-toast";

const Dashboard = () => {
    const { user } = useAuth();

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [recentReviewsList, setRecentReviewsList] = useState([]);
    const [activeProjectId, setActiveProjectId] = useState(null);

    const [stats, setStats] = useState({
        totalProjects: 0,
        totalReviews: 0,
        issuesFound: 0,
        improvement: 0,
    });

    const [reviewRefreshKey, setReviewRefreshKey] = useState(0);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const projectsResponse = await getProjects();
                const projectsList = projectsResponse?.data || [];

                setProjects(projectsList);

                const defaultProjectId =
                    projectsList.length > 0
                        ? projectsList[0]._id
                        : null;

                setActiveProjectId(defaultProjectId);

                let totalReviewsCount = 0;
                let calculatedIssues = 0;

                const reviewsCollector = [];

                if (projectsList.length > 0) {
                    const reviewsResponses = await Promise.all(
                        projectsList.map(async (project) => {
                            try {
                                return await getProjectReviews(project._id);
                            } catch (error) {
                                console.error(
                                    `Failed to fetch reviews for project ${project._id}:`,
                                    error
                                );

                                return { data: [] };
                            }
                        })
                    );

                    projectsList.forEach((project, index) => {
                        const projectReviews =
                            reviewsResponses[index]?.data || [];

                        totalReviewsCount += projectReviews.length;

                        projectReviews.forEach((review) => {
                            const issueCount = review.review
                                ? review.review
                                    .split("\n")
                                    .filter((line) =>
                                        line.trim().startsWith("-")
                                    ).length
                                : 0;

                            calculatedIssues += issueCount;

                            reviewsCollector.push({
                                ...review,
                                projectName: project.title,
                                projectId:
                                    review.projectId || project._id,
                                issueCount,
                            });
                        });
                    });
                }

                reviewsCollector.sort(
                    (firstReview, secondReview) =>
                        new Date(secondReview.createdAt) -
                        new Date(firstReview.createdAt)
                );

                setRecentReviewsList(
                    reviewsCollector.slice(0, 4)
                );

                setStats({
                    totalProjects: projectsList.length,
                    totalReviews: totalReviewsCount,
                    issuesFound: calculatedIssues,
                    improvement: 0,
                });
            } catch (error) {
                console.error(
                    "Dashboard initialize error:",
                    error
                );

                toast.error(
                    "Failed to load dashboard metrics."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [reviewRefreshKey]);

    const triggerWorkspaceRefresh = () => {
        setReviewRefreshKey((previousKey) => previousKey + 1);
    };

    const recentProjects = useMemo(() => {
        return [...projects]
            .sort(
                (firstProject, secondProject) =>
                    new Date(
                        secondProject.updatedAt ||
                        secondProject.createdAt
                    ) -
                    new Date(
                        firstProject.updatedAt ||
                        firstProject.createdAt
                    )
            )
            .slice(0, 4);
    }, [projects]);

    if (loading) {
        return (
            <div
                className="
                    flex min-h-[500px]
                    items-center justify-center
                    bg-transparent
                "
            >
                <Loader text="Loading PrismCode dashboard..." />
            </div>
        );
    }

    const firstName =
        user?.name?.split(" ")?.[0] || "Developer";

    const statCards = [
        {
            title: "Total Projects",
            value: stats.totalProjects,
            subtitle: "Active repositories",
            icon: Folder,
            iconClass:
                "border-[#0ea5e9]/25 bg-[#0ea5e9]/10 text-[#38bdf8]",
            glowClass: "bg-[#0ea5e9]/10",
        },
        {
            title: "Total Reviews",
            value: stats.totalReviews,
            subtitle: "AI audit sessions",
            icon: Code2,
            iconClass:
                "border-[#8b5cf6]/25 bg-[#8b5cf6]/10 text-[#a78bfa]",
            glowClass: "bg-[#8b5cf6]/10",
        },
        {
            title: "Issues Found",
            value: stats.issuesFound,
            subtitle: "Detected review points",
            icon: AlertTriangle,
            iconClass:
                "border-[#f97316]/25 bg-[#f97316]/10 text-[#fb923c]",
            glowClass: "bg-[#f97316]/10",
        },
        {
            title: "Improvement",
            value: `${stats.improvement}%`,
            subtitle: "Quality improvement",
            icon: TrendingUp,
            iconClass:
                "border-[#22c55e]/25 bg-[#22c55e]/10 text-[#4ade80]",
            glowClass: "bg-[#22c55e]/10",
        },
    ];

    return (
        <div
            className="
                min-h-screen
                bg-transparent
                px-4 py-5
                text-text-primary
                sm:px-5
                lg:px-6
            "
        >
            {/* Dashboard Overview */}
            <section
                className="
                    relative overflow-hidden
                    rounded-xl
                    border border-[#1b3553]
                    bg-[linear-gradient(135deg,rgba(5,19,38,0.92),rgba(4,12,29,0.88)_55%,rgba(12,7,34,0.9))]
                    p-5
                    shadow-[0_18px_50px_rgba(0,0,0,0.22)]
                    sm:p-6
                "
            >
                {/* Atmospheric Geometry */}
                <div
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute inset-0
                        overflow-hidden
                    "
                >
                    <div
                        className="
                            absolute -right-20 -top-40
                            h-[360px] w-[360px]
                            rotate-[18deg]
                            bg-secondary/[0.055]
                            [clip-path:polygon(50%_0%,100%_100%,0%_78%)]
                        "
                    />

                    <div
                        className="
                            absolute left-[32%] top-[-180px]
                            h-[340px] w-[420px]
                            rotate-12
                            bg-primary/[0.025]
                            [clip-path:polygon(50%_0%,100%_100%,0%_72%)]
                        "
                    />
                </div>

                {/* Header */}
                <div
                    className="
                        relative z-10
                        flex flex-col gap-4
                        sm:flex-row
                        sm:items-start
                        sm:justify-between
                    "
                >
                    <div>
                        <h1
                            className="
                                text-[25px] font-bold
                                tracking-[-0.035em]
                                text-white
                                sm:text-[28px]
                            "
                        >
                            Welcome back, {firstName}! 👋
                        </h1>

                        <p
                            className="
                                mt-1 text-[13px]
                                text-[#8ea0b8]
                            "
                        >
                            Here's what's happening with your code today.
                        </p>
                    </div>

                    <Link
                        to="/projects/new"
                        className="
                            prism-btn-primary
                            inline-flex h-11
                            items-center justify-center
                            gap-2 rounded-lg
                            px-5
                            text-[12px] font-semibold
                            text-white
                        "
                    >
                        <Plus size={17} strokeWidth={2} />
                        New Project
                    </Link>
                </div>

                {/* Stats */}
                <div
                    className="
                        relative z-10
                        mt-5 grid
                        grid-cols-1 gap-3
                        sm:grid-cols-2
                        xl:grid-cols-4
                    "
                >
                    {statCards.map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <div
                                key={stat.title}
                                className="
                                    group relative
                                    min-h-[108px]
                                    overflow-hidden
                                    rounded-lg
                                    border border-[#25415f]
                                    bg-[linear-gradient(135deg,rgba(7,27,51,0.92),rgba(5,16,34,0.94))]
                                    p-4
                                    transition-all duration-200
                                    hover:-translate-y-0.5
                                    hover:border-[#31577c]
                                "
                            >
                                <div
                                    aria-hidden="true"
                                    className={`
                                        absolute -right-7 -top-7
                                        h-24 w-24
                                        rounded-full blur-[38px]
                                        ${stat.glowClass}
                                    `}
                                />

                                <div
                                    className="
                                        relative flex
                                        items-start gap-3
                                    "
                                >
                                    <div
                                        className={`
                                            flex h-10 w-10
                                            shrink-0 items-center
                                            justify-center
                                            rounded-lg border
                                            ${stat.iconClass}
                                        `}
                                    >
                                        <Icon
                                            size={20}
                                            strokeWidth={1.8}
                                        />
                                    </div>

                                    <div>
                                        <p
                                            className="
                                                text-[11px]
                                                font-medium
                                                text-[#94a3b8]
                                            "
                                        >
                                            {stat.title}
                                        </p>

                                        <h3
                                            className="
                                                mt-1 text-[25px]
                                                font-bold leading-none
                                                tracking-[-0.03em]
                                                text-white
                                            "
                                        >
                                            {stat.value}
                                        </h3>

                                        <p
                                            className="
                                                mt-2 text-[10px]
                                                text-[#718096]
                                            "
                                        >
                                            {stat.subtitle}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Recent Data */}
            <section
                className="
                    mt-3 grid
                    grid-cols-1 gap-3
                    xl:grid-cols-2
                "
            >
                {/* Recent Projects */}
                <div
                    className="
                        min-h-[260px]
                        rounded-xl
                        border border-[#1b3553]
                        bg-[linear-gradient(145deg,rgba(5,18,37,0.92),rgba(3,12,27,0.96))]
                        p-4
                    "
                >
                    <div
                        className="
                            flex items-center
                            justify-between
                            border-b border-[#172d47]
                            pb-3
                        "
                    >
                        <h2
                            className="
                                text-[15px]
                                font-semibold text-white
                            "
                        >
                            Recent Projects
                        </h2>

                        <Link
                            to="/projects"
                            className="
                                rounded-md
                                border border-[#213a57]
                                px-3 py-1.5
                                text-[10px]
                                text-[#9ba9bc]
                                transition-colors
                                hover:border-primary/35
                                hover:text-primary
                            "
                        >
                            View all
                        </Link>
                    </div>

                    <div className="divide-y divide-[#152a43]">
                        {recentProjects.length === 0 ? (
                            <div
                                className="
                                    flex min-h-[190px]
                                    flex-col items-center
                                    justify-center text-center
                                "
                            >
                                <Folder
                                    size={26}
                                    className="text-[#506077]"
                                />

                                <p
                                    className="
                                        mt-3 text-[12px]
                                        text-[#8190a6]
                                    "
                                >
                                    No projects created yet.
                                </p>

                                <Link
                                    to="/projects/new"
                                    className="
                                        mt-3 text-[11px]
                                        font-medium text-primary
                                        hover:underline
                                    "
                                >
                                    Create your first project
                                </Link>
                            </div>
                        ) : (
                            recentProjects.map((project) => {
                                const updatedDate =
                                    project.updatedAt ||
                                    project.createdAt;

                                return (
                                    <Link
                                        key={project._id}
                                        to={`/projects/${project._id}`}
                                        className="
                                            group flex min-h-[58px]
                                            items-center
                                            justify-between gap-3
                                            rounded-lg px-1.5 py-2
                                            transition-colors
                                            hover:bg-white/[0.018]
                                        "
                                    >
                                        <div
                                            className="
                                                flex min-w-0
                                                items-center gap-3
                                            "
                                        >
                                            <div
                                                className="
                                                    flex h-8 w-8
                                                    shrink-0
                                                    items-center
                                                    justify-center
                                                    rounded-md
                                                    border border-[#243b58]
                                                    bg-[#08172b]
                                                    font-mono text-[10px]
                                                    font-semibold
                                                    text-[#aab7c8]
                                                "
                                            >
                                                {project.title
                                                    ?.slice(0, 2)
                                                    .toUpperCase()}
                                            </div>

                                            <div className="min-w-0">
                                                <h3
                                                    className="
                                                        truncate
                                                        text-[12px]
                                                        font-semibold
                                                        text-white
                                                        transition-colors
                                                        group-hover:text-primary
                                                    "
                                                >
                                                    {project.title}
                                                </h3>

                                                <p
                                                    className="
                                                        mt-0.5 truncate
                                                        text-[10px]
                                                        text-[#78879d]
                                                    "
                                                >
                                                    {project.language ||
                                                        "Project"}{" "}
                                                    • Updated{" "}
                                                    {new Date(
                                                        updatedDate
                                                    ).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>

                                        <ChevronRight
                                            size={15}
                                            className="
                                                shrink-0
                                                text-[#65758b]
                                                transition-all
                                                group-hover:translate-x-0.5
                                                group-hover:text-primary
                                            "
                                        />
                                    </Link>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Recent Reviews */}
                <div
                    className="
                        min-h-[260px]
                        rounded-xl
                        border border-[#1b3553]
                        bg-[linear-gradient(145deg,rgba(5,18,37,0.92),rgba(3,12,27,0.96))]
                        p-4
                    "
                >
                    <div
                        className="
                            flex items-center
                            justify-between
                            border-b border-[#172d47]
                            pb-3
                        "
                    >
                        <h2
                            className="
                                text-[15px]
                                font-semibold text-white
                            "
                        >
                            Recent Reviews
                        </h2>

                        <Link
                            to="/projects"
                            className="
                                rounded-md
                                border border-[#213a57]
                                px-3 py-1.5
                                text-[10px]
                                text-[#9ba9bc]
                                transition-colors
                                hover:border-primary/35
                                hover:text-primary
                            "
                        >
                            View all
                        </Link>
                    </div>

                    <div className="divide-y divide-[#152a43]">
                        {recentReviewsList.length === 0 ? (
                            <div
                                className="
                                    flex min-h-[190px]
                                    flex-col items-center
                                    justify-center text-center
                                "
                            >
                                <Code2
                                    size={26}
                                    className="text-[#506077]"
                                />

                                <p
                                    className="
                                        mt-3 text-[12px]
                                        text-[#8190a6]
                                    "
                                >
                                    No reviews generated yet.
                                </p>
                            </div>
                        ) : (
                            recentReviewsList.map((review) => (
                                <Link
                                    key={review._id}
                                    to={`/projects/${review.projectId}/reviews/${review._id}`}
                                    className="
                                        group flex min-h-[58px]
                                        items-center
                                        justify-between gap-3
                                        rounded-lg px-1.5 py-2
                                        transition-colors
                                        hover:bg-white/[0.018]
                                    "
                                >
                                    <div
                                        className="
                                            flex min-w-0
                                            items-center gap-3
                                        "
                                    >
                                        <span
                                            className="
                                                h-2 w-2 shrink-0
                                                rounded-full
                                                bg-primary
                                                shadow-[0_0_8px_rgba(6,182,212,0.55)]
                                            "
                                        />

                                        <div className="min-w-0">
                                            <h3
                                                className="
                                                    truncate
                                                    text-[12px]
                                                    font-semibold
                                                    text-white
                                                    transition-colors
                                                    group-hover:text-primary
                                                "
                                            >
                                                {review.projectName ||
                                                    "Project Review"}
                                            </h3>

                                            <p
                                                className="
                                                    mt-0.5
                                                    text-[10px]
                                                    text-[#78879d]
                                                "
                                            >
                                                {review.issueCount} review
                                                points •{" "}
                                                {new Date(
                                                    review.createdAt
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div
                                        className="
                                            flex shrink-0
                                            items-center gap-2
                                        "
                                    >
                                        {review.language && (
                                            <span
                                                className="
                                                    rounded-md
                                                    border border-primary/20
                                                    bg-primary/[0.07]
                                                    px-2 py-1
                                                    text-[9px]
                                                    font-medium
                                                    capitalize
                                                    text-primary
                                                "
                                            >
                                                {review.language}
                                            </span>
                                        )}

                                        <ChevronRight
                                            size={15}
                                            className="
                                                text-[#65758b]
                                                transition-all
                                                group-hover:translate-x-0.5
                                                group-hover:text-primary
                                            "
                                        />
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Review Workspace */}
            {activeProjectId && (
                <section className="mt-3">
                    <ReviewWorkspace
                        projectId={activeProjectId}
                        onReviewCreated={triggerWorkspaceRefresh}
                    />
                </section>
            )}

            {/* Feature Strip */}
            <footer
                className="
                    mt-3 rounded-xl
                    border border-[#19314d]
                    bg-[#030c1c]/80
                    px-5 py-4
                "
            >
                <div
                    className="
                        grid grid-cols-1 gap-4
                        sm:grid-cols-2
                        xl:grid-cols-5
                    "
                >
                    <FeatureItem
                        icon={Zap}
                        title="AI-Powered"
                        description="Smart code analysis"
                    />

                    <FeatureItem
                        icon={Lock}
                        title="Secure"
                        description="Your code is private"
                    />

                    <FeatureItem
                        icon={Clock}
                        title="Fast"
                        description="Results in seconds"
                    />

                    <FeatureItem
                        icon={Code2}
                        title="Developer First"
                        description="Built for developers"
                    />

                    <FeatureItem
                        icon={ShieldCheck}
                        title="Privacy Focused"
                        description="Your data, your control"
                    />
                </div>
            </footer>
        </div>
    );
};

const FeatureItem = ({
    icon: Icon,
    title,
    description,
}) => {
    return (
        <div className="flex items-center gap-3">
            <Icon
                size={20}
                strokeWidth={1.7}
                className="shrink-0 text-primary"
            />

            <div>
                <p
                    className="
                        text-[11px]
                        font-medium text-white
                    "
                >
                    {title}
                </p>

                <p
                    className="
                        mt-0.5 text-[9px]
                        text-[#718096]
                    "
                >
                    {description}
                </p>
            </div>
        </div>
    );
};

export default Dashboard;
export default function AdminLoginLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F7F5FB] via-white to-[#EEEAF8]">
            {children}
        </div>
    )
}

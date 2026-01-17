export default function EnrollmentLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-[#F7F5FB]">
            {/* No Navbar */}
            {/* No Footer */}

            {children}
        </div>
    )
}

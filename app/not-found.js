export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold text-primary">404 - Page Not Found</h1>
      <p className="text-tsecondary mt-2">Sorry, the page you’re looking for doesn’t exist.</p>
    </div>
  );
}

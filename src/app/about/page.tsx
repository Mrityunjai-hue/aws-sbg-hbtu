import { Card } from "@/components/ui";

export default function AboutPage() {
  return (
    <div className="px-4 py-20">
      <div className="mx-auto max-w-container">
        <h1 className="mb-4 font-heading text-5xl font-extrabold text-text">About Us</h1>
        <p className="mb-12 max-w-2xl text-lg text-text-muted">
          We are the AWS Student Builder Group at HBTU Kanpur, empowering students to innovate on the cloud.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <h2 className="font-heading text-3xl font-bold text-text">Our Mission</h2>
            <div className="h-1 w-16 bg-accent"></div>
            <p className="text-lg leading-relaxed text-text-muted">
              AWS Student Builder Groups are vibrant, student-led communities on post-secondary school campuses. Students come together to explore cloud technology, build innovative projects, and grow their technical skills.
            </p>
            <p className="text-lg leading-relaxed text-text-muted">
              We aim to bridge the gap between academia and industry by organizing hackathons, study groups, and hands-on workshops that leverage Amazon Web Services.
            </p>
          </div>
          <Card className="flex flex-col justify-center p-8">
            <h3 className="mb-4 font-heading text-2xl font-semibold text-text">Why Cloud?</h3>
            <p className="text-text-muted mb-4">
              Cloud computing is the backbone of modern applications. By mastering AWS early, you position yourself at the forefront of technological innovation.
            </p>
            <ul className="space-y-2 text-text-muted">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-accent">check_circle</span> High demand for cloud skills
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-accent">check_circle</span> Scalable architecture
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-accent">check_circle</span> Industry-recognized certifications
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}

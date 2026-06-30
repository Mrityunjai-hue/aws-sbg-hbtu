import { Card, Badge, Button } from "@/components/ui";

export default function TracksPage() {
  return (
    <div className="px-4 py-20">
      <div className="mx-auto max-w-container">
        <div className="mb-16 text-center">
          <h1 className="mb-4 font-heading text-5xl font-extrabold text-text">Learning Tracks</h1>
          <p className="text-lg text-text-muted">Architected paths for technical mastery</p>
        </div>

        <div className="space-y-8">
          <Card className="group p-8 transition-all hover:border-accent/50 md:p-12">
            <div className="flex flex-col gap-8 md:flex-row md:items-center">
              <div className="flex-1 space-y-4">
                <span className="material-symbols-outlined text-4xl text-accent">cloud</span>
                <h2 className="font-heading text-3xl font-semibold text-text">Cloud Foundations</h2>
                <p className="text-lg text-text-muted">
                  Master the core building blocks of AWS infrastructure, security, and networking. Perfect for beginners looking to prepare for the Cloud Practitioner certification.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge>EC2</Badge>
                  <Badge>S3</Badge>
                  <Badge>VPC</Badge>
                  <Badge>IAM</Badge>
                </div>
              </div>
              <div className="md:w-64">
                <Button className="w-full">Start Track</Button>
              </div>
            </div>
          </Card>

          <Card className="group p-8 transition-all hover:border-accent/50 md:p-12">
            <div className="flex flex-col gap-8 md:flex-row md:items-center">
              <div className="flex-1 space-y-4">
                <span className="material-symbols-outlined text-4xl text-accent">bolt</span>
                <h2 className="font-heading text-3xl font-semibold text-text">Serverless Applications</h2>
                <p className="text-lg text-text-muted">
                  Build and scale modern applications without managing servers or infrastructure. Focus on writing code that serves your users seamlessly.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge>Lambda</Badge>
                  <Badge>DynamoDB</Badge>
                  <Badge>API Gateway</Badge>
                  <Badge>EventBridge</Badge>
                </div>
              </div>
              <div className="md:w-64">
                <Button className="w-full">Start Track</Button>
              </div>
            </div>
          </Card>

          <Card className="group p-8 transition-all hover:border-accent/50 md:p-12">
            <div className="flex flex-col gap-8 md:flex-row md:items-center">
              <div className="flex-1 space-y-4">
                <span className="material-symbols-outlined text-4xl text-accent">psychology</span>
                <h2 className="font-heading text-3xl font-semibold text-text">Machine Learning</h2>
                <p className="text-lg text-text-muted">
                  Unlock predictive power with Amazon SageMaker and Generative AI tools. Train models and implement AI services into your apps.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge>SageMaker</Badge>
                  <Badge>Bedrock</Badge>
                  <Badge>Rekognition</Badge>
                  <Badge>Comprehend</Badge>
                </div>
              </div>
              <div className="md:w-64">
                <Button className="w-full">Start Track</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Shield, FileText, Scale, AlertCircle } from 'lucide-react';

export default function DMCAPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-neonBlue-500 to-electricPurple-500 mb-4 shadow-neon-blue">
            <Scale className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neonBlue-400 to-electricPurple-400 bg-clip-text text-transparent">
              DMCA / Copyright Policy
            </span>
          </h1>
          <p className="text-muted-foreground">
            Legal information and usage terms for our digital products
          </p>
        </div>

        <div className="space-y-6">
          <Card className="border-neonBlue-500/20 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-neonBlue-400" />
                Educational Purpose Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                All software, courses, and digital products available on this platform are provided <strong>for educational purposes only</strong>.
              </p>
              <p>
                Users are responsible for ensuring their use of these materials complies with all applicable laws and regulations in their jurisdiction. We do not endorse or encourage any illegal use of the products sold on this platform.
              </p>
            </CardContent>
          </Card>

          <Card className="border-electricPurple-500/20 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-electricPurple-400" />
                GPL Licensed Software
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                Certain software products available on this platform are distributed under the <strong>General Public License (GPL)</strong>.
              </p>
              <p>
                GPL is a free, copyleft license for software and other kinds of works. It guarantees end users the freedom to run, study, share, and modify the software. When we distribute GPL-licensed software, we do so in compliance with the terms of the GPL.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You have the right to use the software for any purpose</li>
                <li>You have the right to modify the software to suit your needs</li>
                <li>You have the right to share the software with others</li>
                <li>You have the right to share your modifications with others</li>
              </ul>
              <p className="text-sm">
                For more information about GPL licensing, please visit: <a href="https://www.gnu.org/licenses/gpl-3.0.en.html" target="_blank" rel="noopener noreferrer" className="text-neonBlue-400 hover:underline">GNU GPL v3.0</a>
              </p>
            </CardContent>
          </Card>

          <Card className="border-neonBlue-500/20 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-neonBlue-400" />
                Resell Rights & PLR Products
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                Many of our digital products are sold with <strong>Private Label Rights (PLR)</strong> or <strong>Resell Rights</strong>. This means:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>PLR Products:</strong> You can modify, rebrand, and resell these products as your own</li>
                <li><strong>Resell Rights:</strong> You can resell these products to others without modification</li>
                <li><strong>Master Resell Rights:</strong> You can resell the product and also grant resell rights to your customers</li>
              </ul>
              <p>
                We only sell products for which we have obtained proper authorization and resell rights from the original creators or rights holders. Each product listing clearly indicates the type of rights included with your purchase.
              </p>
              <Separator className="my-4" />
              <p className="text-sm font-semibold text-neonBlue-300">
                Important: Not all products include resell rights. Please check individual product descriptions for specific licensing terms.
              </p>
            </CardContent>
          </Card>

          <Card className="border-electricPurple-500/20 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-electricPurple-400" />
                Copyright Infringement Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                We respect the intellectual property rights of others and expect our users to do the same. If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement, please provide us with the following information:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>A description of the copyrighted work that you claim has been infringed</li>
                <li>A description of where the material you claim is infringing is located on our site</li>
                <li>Your contact information (email address, phone number)</li>
                <li>A statement that you have a good faith belief that the disputed use is not authorized</li>
                <li>A statement, made under penalty of perjury, that the information in your notice is accurate</li>
                <li>An electronic or physical signature of the copyright owner or authorized representative</li>
              </ul>
              <p className="text-sm mt-4">
                Upon receiving a valid DMCA notice, we will promptly investigate and take appropriate action, which may include removing or disabling access to the allegedly infringing material.
              </p>
            </CardContent>
          </Card>

          <Card className="border-neonBlue-500/20 bg-neonBlue-500/5">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                This policy may be updated from time to time. Please check this page periodically for changes. Your continued use of our platform after any changes constitutes acceptance of the updated policy.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

import './globals.css';
import { AuthProvider } from '@/context/auth-context';
import { ThemeProvider } from '@/context/theme-context';
import { ApolloWrapper } from '@/lib/apollo-wrapper';

export const metadata = {
  title: 'Slooze Commodities Management',
  description: 'Role based commodities platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <AuthProvider>
            <ApolloWrapper>{children}</ApolloWrapper>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

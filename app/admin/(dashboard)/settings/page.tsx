'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Settings as SettingsIcon, Shield, Database } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your admin panel settings and users
        </p>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            User Management
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <SettingsIcon className="h-4 w-4" />
            System Settings
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="backup" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Backup & Restore
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage admin users and their permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Admin Users</h3>
                    <p className="text-sm text-muted-foreground">
                      Create, edit, and manage admin users
                    </p>
                  </div>
                  <Link href="/admin/settings/users">
                    <Button>Manage Users</Button>
                  </Link>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium mb-2">Role Definitions:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>
                      <span className="font-medium">ADMIN:</span> Full access to all features
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="inline-block w-3 h-3 rounded-full bg-blue-500"></span>
                      <span className="font-medium">EDITOR:</span> Can create/edit insights, authors, tags
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                      <span className="font-medium">VIEWER:</span> Read-only access to insights
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>
                Configure system preferences and defaults
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">System settings will be available soon.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security and access controls
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Security settings will be available soon.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup">
          <Card>
            <CardHeader>
              <CardTitle>Backup & Restore</CardTitle>
              <CardDescription>
                Manage data backups and restoration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Backup features will be available soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}


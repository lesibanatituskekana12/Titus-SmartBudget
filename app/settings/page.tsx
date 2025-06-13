"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Moon, Sun, Palette, Bell, Languages, Accessibility } from "lucide-react"

export default function SettingsPage() {
  const { toast } = useToast()
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system")
  const [fontSize, setFontSize] = useState<number>(100)
  const [language, setLanguage] = useState<string>("en")
  const [currency, setCurrency] = useState<string>("ZAR")
  const [notifications, setNotifications] = useState<boolean>(true)
  const [weeklyTips, setWeeklyTips] = useState<boolean>(true)
  const [highContrast, setHighContrast] = useState<boolean>(false)
  const [reducedMotion, setReducedMotion] = useState<boolean>(false)
  const [screenReader, setScreenReader] = useState<boolean>(false)
  const [soundEffects, setSoundEffects] = useState<boolean>(true)

  const handleSave = () => {
    // In a real app, this would save to a backend
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Customize your SmartBudget experience</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Appearance
            </CardTitle>
            <CardDescription>Customize how SmartBudget looks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <RadioGroup
                  defaultValue={theme}
                  onValueChange={(value) => setTheme(value as "light" | "dark" | "system")}
                  className="grid grid-cols-3 gap-4"
                >
                  <div>
                    <RadioGroupItem value="light" id="light" className="peer sr-only" />
                    <Label
                      htmlFor="light"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <Sun className="mb-2 h-5 w-5" />
                      <span>Light</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
                    <Label
                      htmlFor="dark"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <Moon className="mb-2 h-5 w-5" />
                      <span>Dark</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="system" id="system" className="peer sr-only" />
                    <Label
                      htmlFor="system"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="mb-2 flex h-5 w-5 items-center justify-center rounded-full border-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-foreground" />
                      </div>
                      <span>System</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="font-size">Font Size ({fontSize}%)</Label>
                </div>
                <Slider
                  id="font-size"
                  min={75}
                  max={150}
                  step={5}
                  defaultValue={[fontSize]}
                  onValueChange={(values) => setFontSize(values[0])}
                  aria-label="Font size adjustment"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-y-0">
              <Label htmlFor="notifications" className="flex flex-col space-y-1">
                <span>Enable Notifications</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Receive alerts about your budget and goals
                </span>
              </Label>
              <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
            </div>
            <div className="flex items-center justify-between space-y-0">
              <Label htmlFor="weekly-tips" className="flex flex-col space-y-1">
                <span>Weekly Financial Tips</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Receive weekly personalized financial advice
                </span>
              </Label>
              <Switch id="weekly-tips" checked={weeklyTips} onCheckedChange={setWeeklyTips} disabled={!notifications} />
            </div>
            <div className="flex items-center justify-between space-y-0">
              <Label htmlFor="sound-effects" className="flex flex-col space-y-1">
                <span>Sound Effects</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Play sounds for actions and achievements
                </span>
              </Label>
              <Switch id="sound-effects" checked={soundEffects} onCheckedChange={setSoundEffects} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Languages className="h-5 w-5" />
              Regional Settings
            </CardTitle>
            <CardDescription>Customize language and currency preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select defaultValue={language} onValueChange={setLanguage}>
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="af">Afrikaans</SelectItem>
                  <SelectItem value="zu">isiZulu</SelectItem>
                  <SelectItem value="xh">isiXhosa</SelectItem>
                  <SelectItem value="st">Sesotho</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select defaultValue={currency} onValueChange={setCurrency}>
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ZAR">South African Rand (R)</SelectItem>
                  <SelectItem value="USD">US Dollar ($)</SelectItem>
                  <SelectItem value="EUR">Euro (€)</SelectItem>
                  <SelectItem value="GBP">British Pound (£)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Accessibility className="h-5 w-5" />
              Accessibility
            </CardTitle>
            <CardDescription>Make SmartBudget more accessible for your needs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-y-0">
              <Label htmlFor="high-contrast" className="flex flex-col space-y-1">
                <span>High Contrast Mode</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Increase contrast for better visibility
                </span>
              </Label>
              <Switch id="high-contrast" checked={highContrast} onCheckedChange={setHighContrast} />
            </div>
            <div className="flex items-center justify-between space-y-0">
              <Label htmlFor="reduced-motion" className="flex flex-col space-y-1">
                <span>Reduced Motion</span>
                <span className="font-normal text-xs text-muted-foreground">Minimize animations and transitions</span>
              </Label>
              <Switch id="reduced-motion" checked={reducedMotion} onCheckedChange={setReducedMotion} />
            </div>
            <div className="flex items-center justify-between space-y-0">
              <Label htmlFor="screen-reader" className="flex flex-col space-y-1">
                <span>Screen Reader Optimization</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Enhance compatibility with screen readers
                </span>
              </Label>
              <Switch id="screen-reader" checked={screenReader} onCheckedChange={setScreenReader} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Settings</Button>
      </div>
    </div>
  )
}

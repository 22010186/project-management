"use client";

import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  Clock,
  MessageSquare,
  Shield,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useRouter } from "next/navigation";
import { useStateUser } from "@/store/state";
import { useTranslation } from "react-i18next";

export const LandingPage = () => {
  const { t } = useTranslation();
  const features = [
    {
      icon: Users,
      title: "Team Collaboration",
      description:
        "Create projects and invite team members to collaborate seamlessly across your organization.",
    },
    {
      icon: CheckCircle,
      title: "Task Management",
      description:
        "Assign tasks, set deadlines, and track progress with our intuitive task management system.",
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description:
        "Monitor project progress with real-time analytics and detailed reporting features.",
    },
    {
      icon: MessageSquare,
      title: "Team Communication",
      description:
        "Built-in communication tools to keep your team connected and projects moving forward.",
    },
  ];
  const benefits = [
    {
      icon: Zap,
      title: "Boost Productivity",
      description:
        "Streamline workflows and eliminate bottlenecks to get more done in less time.",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description:
        "Enterprise-grade security to keep your projects and data safe and protected.",
    },
    {
      icon: Clock,
      title: "Save Time",
      description:
        "Automated workflows and smart notifications help your team focus on what matters most.",
    },
  ];
  const route = useRouter();
  const { dataUser } = useStateUser();

  function handleStartForFree() {
    if (dataUser) {
      route.push("/dashboard");
    } else {
      route.push("/auth");
    }
  }

  return (
    <div className="min-h-screen w-full">
      {/* Hero Section */}
      <section className=" px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-100">
            ✨ {t("landing.1.badge")}
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            {t("landing.1.title.1")}{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t("landing.1.title.2")}
            </span>{" "}
            {t("landing.1.title.3")}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t("landing.1.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleStartForFree}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3"
            >
              {t("landing.1.button.1")}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3">
              {t("landing.1.button.2")}
            </Button>
          </div>
          <div className="mt-12 flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-red-400"></div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-blue-400"></div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"></div>
              </div>
              <span className="ml-3">{t("landing.1.rating.1")}</span>
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="ml-1">4.9/5 ({t("landing.1.rating.2")})</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t("landing.2.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t("landing.2.description")}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50 dark:from-gray-600 dark:to-gray-800"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-100 mb-3">
                    {t("landing.2.card." + (index + 1) + ".title")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {t("landing.2.card." + (index + 1) + ".description")}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        id="benefits"
        className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-300 dark:to-purple-500"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t("landing.3.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t("landing.3.description")}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {t("landing.3.card." + (index + 1) + ".title")}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t("landing.3.card." + (index + 1) + ".description")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl font-bold text-white mb-6">
            {t("landing.4.title")}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t("landing.4.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3"
            >
              {t("landing.4.button.1")}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white hover:bg-white text-blue-400 hover:text-blue-600 text-lg px-8 py-3"
            >
              {t("landing.4.button.2")}
            </Button>
          </div>
          <p className="text-blue-100 text-sm mt-6">
            {t("landing.4.placeholder")}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">PM</span>
                </div>
                <span className="text-xl font-bold">ProjectM</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                {t("landing.5.card.1.title")}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">
                {t("landing.5.card.2.title")}
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t("landing.5.card.2.items.1")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t("landing.5.card.2.items.2")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t("landing.5.card.2.items.3")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t("landing.5.card.2.items.4")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">
                {t("landing.5.card.3.title")}
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t("landing.5.card.3.items.1")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t("landing.5.card.3.items.2")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t("landing.5.card.3.items.3")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t("landing.5.card.3.items.4")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">
                {t("landing.5.card.4.title")}
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t("landing.5.card.4.items.1")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t("landing.5.card.4.items.2")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t("landing.5.card.4.items.3")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t("landing.5.card.4.items.4")}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ProjectM. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

'use client'

import React from "react"
import Link from "next/link"
import { Button } from "../components/ui/button"
import { Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen pt-16 bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-700">
            404
          </h1>
          <div className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="group">
            <Link to="/">
              <Home className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              Go Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="group">
            <button onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </button>
          </Button>
        </div>
        
        
      </div>
    </div>
  );
};

export default NotFound;
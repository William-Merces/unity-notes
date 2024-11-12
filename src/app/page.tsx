'use client';

import Link from 'next/link';
import { School, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Unity Notes
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            TODOS NA MESMA PÁGINA - Escola Dominical
          </p>
        </div>

        {/* Cards de Seleção */}
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Card do Professor */}
          <Link
            href="/professor"
            className="block p-6 rounded-lg border-2 hover:border-blue-500 bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-200 group"
          >
            <div className="flex items-center justify-center mb-4">
              <School
                className="w-16 h-16 text-blue-500 group-hover:scale-110 transition-transform duration-200"
              />
            </div>
            <h2 className="text-xl font-semibold text-center mb-2 text-gray-900 dark:text-white">
              Professor
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Prepare e gerencie suas aulas com facilidade.
            </p>
          </Link>

          {/* Card do Aluno */}
          <Link
            href="/aluno"
            className="block p-6 rounded-lg border-2 hover:border-green-500 bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-200 group"
          >
            <div className="flex items-center justify-center mb-4">
              <Users
                className="w-16 h-16 text-green-500 group-hover:scale-110 transition-transform duration-200"
              />
            </div>
            <h2 className="text-xl font-semibold text-center mb-2 text-gray-900 dark:text-white">
              Aluno
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Acompanhe a aula em tempo real.
            </p>
          </Link>
        </div>

        {/* Rodapé */}
        <div className="text-center mt-12 text-sm text-gray-500 dark:text-gray-400">
          Unity Notes © 2024 - Escola Dominical
        </div>
      </div>
    </div>
  );
}

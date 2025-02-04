import React from 'react'

export const aboutRus: React.ReactNode = (
  <>
    <p style={{textAlign: 'center'}}>COMMENTS - это демонстрационный фуллстек проект, созданный с целью практики применения следующих технологий:</p>
    <p style={{textAlign: 'center'}}>Frontend: React, Typescript, Redux Toolkit, Tanstack Query. Backend: Express, Prisma ORM.</p>
    <p style={{ textAlign: 'center' }}>Функциональность проекта:</p>
    <ul style={{marginLeft: '25px'}}>
      <li>JWT авторизация/регистрация нового пользователя.</li>
      <li>Добавление/изменение аватара пользователя с сохранением в объектном хранилище S3.</li>
      <li>Добавление/удаление пользователем комментариев либо создание комментариев автоматически.</li>
      <li>Бесконечный скролл с постепенной подгрузкой комментариев, созданных пользователем из базы данных PostgreSQL.</li>
      <li>Настроен CI/CD через GitHub Actions, с дальнейшим развертыанием в Docker на Linux сервере.</li>
    </ul>
    <br/>
    <p style={{ textAlign: 'center' }}>Вход - name: admin, password: 123456789 либо зарегистрируйтесь в качестве нового пользователя.</p>
  </>
)


export const aboutEng: React.ReactNode = (
  <>
    <p style={{textAlign: 'center'}}>COMMENTS - is a demo full-stack project created to practice the use of the following technologies:</p>
    <p style={{textAlign: 'center'}}>Frontend: React, Typescript, Redux Toolkit, Tanstack Query. Backend: Express, Prisma ORM.</p>
    <p style={{ textAlign: 'center' }}>Project functionality:</p>
    <ul style={{marginLeft: '25px'}}>
      <li>JWT authorization/registration of a new user.</li>
      <li>Adding/changing a user avatar with saving in S3 cloud object storage.</li>
      <li>Adding/deleting comments by the user or creating comments automatically.</li>
      <li>Infinite scroll with gradual loading of comments created by the user from the PostgreSQL database.</li>
      <li>Created a CI/CD Pipeline with Docker and GitHub Actions.</li>
    </ul>
    <br/>
    <p style={{ textAlign: 'center' }}>Login - name: admin, password: 123456789 or register as a new user.</p>
  </>
)

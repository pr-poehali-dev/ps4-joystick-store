import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  color: string;
  image: string;
  rating: number;
  reviews: Review[];
  inStock: boolean;
}

interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'DualShock 4 Black',
    price: 4990,
    color: 'Черный',
    image: '/placeholder.svg',
    rating: 4.8,
    reviews: [
      { id: 1, author: 'Игорь', rating: 5, text: 'Отличный джойстик! Удобно лежит в руках, кнопки отзывчивые.', date: '2024-11-10' },
      { id: 2, author: 'Максим', rating: 5, text: 'Оригинальный продукт, быстрая доставка. Рекомендую!', date: '2024-11-08' },
      { id: 3, author: 'Алексей', rating: 4, text: 'Хороший контроллер, но батарея могла бы держать дольше.', date: '2024-11-05' }
    ],
    inStock: true
  },
  {
    id: 2,
    name: 'DualShock 4 Blue',
    price: 5290,
    color: 'Синий',
    image: '/placeholder.svg',
    rating: 4.9,
    reviews: [
      { id: 1, author: 'Дмитрий', rating: 5, text: 'Классный цвет! Качество на высоте.', date: '2024-11-12' },
      { id: 2, author: 'Сергей', rating: 5, text: 'Лучший джойстик из всех что у меня были.', date: '2024-11-09' }
    ],
    inStock: true
  },
  {
    id: 3,
    name: 'DualShock 4 Red',
    price: 5290,
    color: 'Красный',
    image: '/placeholder.svg',
    rating: 4.7,
    reviews: [
      { id: 1, author: 'Артем', rating: 5, text: 'Стильный дизайн, работает безупречно.', date: '2024-11-11' },
      { id: 2, author: 'Владимир', rating: 4, text: 'Хороший контроллер, доволен покупкой.', date: '2024-11-07' }
    ],
    inStock: true
  },
  {
    id: 4,
    name: 'DualShock 4 White',
    price: 5490,
    color: 'Белый',
    image: '/placeholder.svg',
    rating: 4.6,
    reviews: [
      { id: 1, author: 'Евгений', rating: 5, text: 'Красивый белый цвет, качество отличное!', date: '2024-11-06' }
    ],
    inStock: false
  }
];

const faqs = [
  { question: 'Как проверить оригинальность джойстика?', answer: 'Все наши джойстики поставляются в оригинальной упаковке Sony с голограммой и серийным номером. Вы можете проверить подлинность на официальном сайте производителя.' },
  { question: 'Какая гарантия на джойстики?', answer: 'На все товары предоставляется официальная гарантия производителя сроком 12 месяцев.' },
  { question: 'Сколько времени работает батарея?', answer: 'Встроенной батареи хватает на 4-8 часов активной игры в зависимости от использования функций (вибрация, подсветка).' },
  { question: 'Можно ли использовать на ПК?', answer: 'Да, DualShock 4 полностью совместим с ПК через USB или Bluetooth подключение. Поддерживается Steam и другие платформы.' }
];

export default function Index() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Icon
            key={star}
            name={star <= rating ? 'Star' : 'StarOff'}
            className={`w-4 h-4 ${star <= rating ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50 border-b border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center animate-neon-pulse">
                <Icon name="Gamepad2" className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-orbitron font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                PS4 STORE
              </h1>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#catalog" className="text-sm hover:text-primary transition-colors">Каталог</a>
              <a href="#about" className="text-sm hover:text-primary transition-colors">О магазине</a>
              <a href="#delivery" className="text-sm hover:text-primary transition-colors">Доставка</a>
              <a href="#contacts" className="text-sm hover:text-primary transition-colors">Контакты</a>
              <a href="#faq" className="text-sm hover:text-primary transition-colors">FAQ</a>
            </div>
            <Button className="font-orbitron shadow-lg shadow-primary/50">
              <Icon name="ShoppingCart" className="w-4 h-4 mr-2" />
              Корзина
            </Button>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-secondary/5 to-background"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <Badge className="mb-4 font-orbitron text-xs px-4 py-1 bg-primary/20 text-primary border-primary/50">
              Оригинальные контроллеры
            </Badge>
            <h2 className="text-4xl md:text-6xl font-orbitron font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              DUALSHOCK 4
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Испытайте новый уровень игрового комфорта с оригинальными джойстиками PlayStation 4. 
              Широкий выбор цветов, официальная гарантия, быстрая доставка.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="font-orbitron shadow-lg shadow-primary/50 hover:shadow-xl hover:shadow-primary/70 transition-all">
                <Icon name="ShoppingBag" className="w-5 h-5 mr-2" />
                Купить сейчас
              </Button>
              <Button size="lg" variant="outline" className="font-orbitron border-primary/50 hover:bg-primary/10">
                <Icon name="Info" className="w-5 h-5 mr-2" />
                Подробнее
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h3 className="text-3xl md:text-4xl font-orbitron font-bold mb-4">Каталог джойстиков</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Выберите свой стиль из нашей коллекции оригинальных DualShock 4
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <Card 
                key={product.id} 
                className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 cursor-pointer animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedProduct(product)}
              >
                <CardHeader className="p-0">
                  <div className="aspect-square bg-card-foreground/5 rounded-t-lg flex items-center justify-center overflow-hidden">
                    <Icon name="Gamepad2" className="w-24 h-24 text-primary/20 group-hover:text-primary/40 group-hover:scale-110 transition-all duration-300" />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="font-orbitron text-lg">{product.name}</CardTitle>
                    {!product.inStock && (
                      <Badge variant="secondary" className="text-xs">Нет в наличии</Badge>
                    )}
                  </div>
                  <CardDescription className="mb-4">{product.color}</CardDescription>
                  <div className="flex items-center gap-2 mb-4">
                    {renderStars(Math.round(product.rating))}
                    <span className="text-sm text-muted-foreground">
                      {product.rating} ({product.reviews.length})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-orbitron font-bold text-primary">
                      {product.price.toLocaleString()} ₽
                    </span>
                    <Button size="sm" disabled={!product.inStock} className="font-orbitron">
                      <Icon name="ShoppingCart" className="w-4 h-4 mr-2" />
                      В корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {selectedProduct && (
        <section className="py-16 bg-card/50">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-orbitron font-bold mb-8 text-center">
              Отзывы о {selectedProduct.name}
            </h3>
            <div className="max-w-4xl mx-auto space-y-4">
              {selectedProduct.reviews.map((review) => (
                <Card key={review.id} className="border-primary/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{review.author}</CardTitle>
                        <CardDescription>{new Date(review.date).toLocaleDateString('ru-RU')}</CardDescription>
                      </div>
                      {renderStars(review.rating)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{review.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="about" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-orbitron font-bold mb-8 text-center">О магазине</h3>
            <Card className="border-primary/20">
              <CardContent className="p-8">
                <p className="text-lg text-muted-foreground mb-6">
                  Мы специализируемся на продаже оригинальных игровых контроллеров PlayStation 4. 
                  Наша миссия — предоставить геймерам качественные аксессуары по честным ценам.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <Icon name="ShieldCheck" className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="font-orbitron font-bold mb-2">100% Оригинал</h4>
                    <p className="text-sm text-muted-foreground">Только официальная продукция Sony</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <Icon name="Truck" className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="font-orbitron font-bold mb-2">Быстрая доставка</h4>
                    <p className="text-sm text-muted-foreground">По всей России за 1-3 дня</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <Icon name="Award" className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="font-orbitron font-bold mb-2">Гарантия</h4>
                    <p className="text-sm text-muted-foreground">12 месяцев официальной гарантии</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="delivery" className="py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-orbitron font-bold mb-8 text-center">Доставка и оплата</h3>
            
            <Tabs defaultValue="delivery" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="delivery" className="font-orbitron">Доставка</TabsTrigger>
                <TabsTrigger value="payment" className="font-orbitron">Оплата</TabsTrigger>
              </TabsList>
              
              <TabsContent value="delivery">
                <Card className="border-primary/20">
                  <CardContent className="p-8 space-y-6">
                    <div>
                      <h4 className="font-orbitron font-bold mb-3 flex items-center gap-2">
                        <Icon name="Package" className="w-5 h-5 text-primary" />
                        Курьерская доставка
                      </h4>
                      <p className="text-muted-foreground">По Москве и МО — от 300 ₽ (1-2 дня)</p>
                    </div>
                    <div>
                      <h4 className="font-orbitron font-bold mb-3 flex items-center gap-2">
                        <Icon name="MapPin" className="w-5 h-5 text-primary" />
                        Доставка в регионы
                      </h4>
                      <p className="text-muted-foreground">СДЭК, Boxberry — от 350 ₽ (2-5 дней)</p>
                    </div>
                    <div>
                      <h4 className="font-orbitron font-bold mb-3 flex items-center gap-2">
                        <Icon name="Store" className="w-5 h-5 text-primary" />
                        Самовывоз
                      </h4>
                      <p className="text-muted-foreground">Бесплатно из нашего пункта выдачи в Москве</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="payment">
                <Card className="border-primary/20">
                  <CardContent className="p-8 space-y-6">
                    <div>
                      <h4 className="font-orbitron font-bold mb-3 flex items-center gap-2">
                        <Icon name="CreditCard" className="w-5 h-5 text-primary" />
                        Банковские карты
                      </h4>
                      <p className="text-muted-foreground">Visa, MasterCard, МИР — безопасная оплата онлайн</p>
                    </div>
                    <div>
                      <h4 className="font-orbitron font-bold mb-3 flex items-center gap-2">
                        <Icon name="Wallet" className="w-5 h-5 text-primary" />
                        Наличные
                      </h4>
                      <p className="text-muted-foreground">Оплата курьеру или при самовывозе</p>
                    </div>
                    <div>
                      <h4 className="font-orbitron font-bold mb-3 flex items-center gap-2">
                        <Icon name="Smartphone" className="w-5 h-5 text-primary" />
                        СБП
                      </h4>
                      <p className="text-muted-foreground">Система быстрых платежей — без комиссии</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <section id="faq" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-orbitron font-bold mb-8 text-center">Вопросы и ответы</h3>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-primary/20 rounded-lg px-6">
                  <AccordionTrigger className="font-orbitron hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-orbitron font-bold mb-8">Контакты</h3>
            <Card className="border-primary/20">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <Icon name="Phone" className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-orbitron font-bold mb-2">Телефон</h4>
                    <p className="text-sm text-muted-foreground">+7 (495) 123-45-67</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <Icon name="Mail" className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-orbitron font-bold mb-2">Email</h4>
                    <p className="text-sm text-muted-foreground">info@ps4store.ru</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <Icon name="MapPin" className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-orbitron font-bold mb-2">Адрес</h4>
                    <p className="text-sm text-muted-foreground">Москва, ул. Игровая, 42</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t border-primary/20 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Icon name="Gamepad2" className="w-4 h-4 text-primary" />
              </div>
              <span className="font-orbitron font-bold text-sm">PS4 STORE</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              © 2024 PS4 Store. Все права защищены.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="MessageCircle" className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Send" className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

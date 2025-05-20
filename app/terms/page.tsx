import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold">Kullanım Koşulları</h1>
        <p className="text-muted-foreground">Son güncelleme: 20 Mayıs 2025</p>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <p>
          Bu Kullanım Koşulları, SocialPro Studio web sitesini ve hizmetlerini kullanımınızı düzenleyen koşulları
          belirler. Lütfen bu koşulları dikkatlice okuyun.
        </p>

        <h2>1. Hizmet Kullanımı</h2>
        <p>
          SocialPro Studio'yu kullanarak, bu Kullanım Koşullarını kabul etmiş olursunuz. Eğer bu koşulları kabul
          etmiyorsanız, lütfen hizmetlerimizi kullanmayın.
        </p>

        <h2>2. Hesap Oluşturma</h2>
        <p>
          Hizmetlerimizin bazı bölümlerini kullanabilmek için bir hesap oluşturmanız gerekebilir. Hesap bilgilerinizin
          güvenliğinden siz sorumlusunuz ve hesabınız altında gerçekleşen tüm etkinliklerden siz sorumlu tutulursunuz.
        </p>

        <h2>3. Kullanıcı İçeriği</h2>
        <p>
          Hizmetlerimiz aracılığıyla içerik yüklediğinizde, bu içeriğin yasal olduğunu ve üçüncü tarafların haklarını
          ihlal etmediğini garanti edersiniz. SocialPro Studio, uygunsuz veya yasadışı içeriği kaldırma hakkını saklı
          tutar.
        </p>

        <h2>4. Ödeme ve Abonelikler</h2>
        <p>
          Ücretli hizmetlerimize abone olduğunuzda, ödeme bilgilerinizin doğru ve güncel olduğunu garanti edersiniz.
          Abonelikler, iptal edilmediği sürece otomatik olarak yenilenir. İptal işlemleri, bir sonraki fatura döneminden
          önce yapılmalıdır.
        </p>

        <h2>5. Fikri Mülkiyet</h2>
        <p>
          SocialPro Studio ve içeriği, fikri mülkiyet hakları ile korunmaktadır. Hizmetlerimizi kullanmanız, bu hakların
          size devredildiği anlamına gelmez.
        </p>

        <h2>6. Sorumluluk Sınırlaması</h2>
        <p>
          SocialPro Studio, hizmetlerimizin kullanımından kaynaklanan doğrudan, dolaylı, arızi, özel veya sonuç olarak
          ortaya çıkan zararlardan sorumlu tutulamaz.
        </p>

        <h2>7. Değişiklikler</h2>
        <p>
          SocialPro Studio, bu Kullanım Koşullarını herhangi bir zamanda değiştirme hakkını saklı tutar. Değişiklikler,
          web sitemizde yayınlandıktan sonra geçerli olacaktır.
        </p>

        <h2>8. Geçerli Yasa</h2>
        <p>Bu Kullanım Koşulları, Türkiye Cumhuriyeti yasalarına tabidir ve bu yasalara göre yorumlanacaktır.</p>

        <h2>9. İletişim</h2>
        <p>
          Bu Kullanım Koşulları hakkında sorularınız varsa, lütfen{" "}
          <a href="mailto:info@socialprostudio.com">info@socialprostudio.com</a> adresinden bizimle iletişime geçin.
        </p>
      </div>

      <div className="mt-8 flex justify-between items-center">
        <Button variant="outline" asChild>
          <Link href="/">Ana Sayfaya Dön</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/privacy">Gizlilik Politikası</Link>
        </Button>
      </div>
    </div>
  )
}

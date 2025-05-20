import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold">Gizlilik Politikası</h1>
        <p className="text-muted-foreground">Son güncelleme: 20 Mayıs 2025</p>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <p>
          Bu Gizlilik Politikası, SocialPro Studio'nun kişisel verilerinizi nasıl topladığını, kullandığını ve
          koruduğunu açıklar. Hizmetlerimizi kullanarak, bu politikada belirtilen uygulamaları kabul etmiş olursunuz.
        </p>

        <h2>1. Toplanan Bilgiler</h2>
        <p>Aşağıdaki türde kişisel bilgileri toplayabiliriz:</p>
        <ul>
          <li>Ad, e-posta adresi, telefon numarası gibi iletişim bilgileri</li>
          <li>Kullanıcı adı, şifre gibi hesap bilgileri</li>
          <li>Ödeme bilgileri (kredi kartı bilgileri doğrudan tarafımızca saklanmaz)</li>
          <li>IP adresi, tarayıcı türü, ziyaret edilen sayfalar gibi kullanım verileri</li>
          <li>Instagram hesap bilgileri (izin verdiğiniz takdirde)</li>
        </ul>

        <h2>2. Bilgilerin Kullanımı</h2>
        <p>Topladığımız bilgileri aşağıdaki amaçlar için kullanırız:</p>
        <ul>
          <li>Hizmetlerimizi sağlamak ve yönetmek</li>
          <li>Hesabınızı oluşturmak ve yönetmek</li>
          <li>Müşteri desteği sağlamak</li>
          <li>Hizmetlerimizi geliştirmek ve kişiselleştirmek</li>
          <li>Ödemelerinizi işlemek</li>
          <li>Sizinle iletişim kurmak</li>
        </ul>

        <h2>3. Bilgilerin Paylaşımı</h2>
        <p>Kişisel bilgilerinizi aşağıdaki durumlarda üçüncü taraflarla paylaşabiliriz:</p>
        <ul>
          <li>Hizmet sağlayıcılarımız (ödeme işlemcileri, hosting sağlayıcıları gibi)</li>
          <li>Yasal zorunluluk durumunda (mahkeme kararı veya yasal süreç)</li>
          <li>Şirket birleşmesi veya satın alınması durumunda</li>
        </ul>

        <h2>4. Veri Güvenliği</h2>
        <p>
          Kişisel bilgilerinizi korumak için uygun teknik ve organizasyonel önlemler alıyoruz. Ancak, internet üzerinden
          hiçbir veri iletiminin %100 güvenli olmadığını unutmayın.
        </p>

        <h2>5. Çerezler</h2>
        <p>
          Hizmetlerimizde çerezler ve benzer teknolojiler kullanıyoruz. Bu teknolojiler, deneyiminizi kişiselleştirmek
          ve hizmetlerimizi geliştirmek için kullanılır.
        </p>

        <h2>6. Veri Saklama</h2>
        <p>
          Kişisel bilgilerinizi, hizmetlerimizi sağlamak için gerekli olduğu sürece veya yasal yükümlülüklerimizi yerine
          getirmek için saklarız.
        </p>

        <h2>7. Haklarınız</h2>
        <p>Kişisel verilerinizle ilgili aşağıdaki haklara sahipsiniz:</p>
        <ul>
          <li>Verilerinize erişim talep etme</li>
          <li>Verilerinizin düzeltilmesini talep etme</li>
          <li>Verilerinizin silinmesini talep etme</li>
          <li>Veri işlememize itiraz etme</li>
          <li>Veri taşınabilirliği talep etme</li>
        </ul>

        <h2>8. Çocukların Gizliliği</h2>
        <p>
          Hizmetlerimiz 18 yaşın altındaki kişilere yönelik değildir. Bilerek 18 yaşın altındaki kişilerden kişisel
          bilgi toplamayız.
        </p>

        <h2>9. Değişiklikler</h2>
        <p>
          Bu Gizlilik Politikasını zaman zaman güncelleyebiliriz. Değişiklikler, web sitemizde yayınlandıktan sonra
          geçerli olacaktır.
        </p>

        <h2>10. İletişim</h2>
        <p>
          Gizlilik uygulamalarımız hakkında sorularınız varsa, lütfen{" "}
          <a href="mailto:privacy@socialprostudio.com">privacy@socialprostudio.com</a> adresinden bizimle iletişime
          geçin.
        </p>
      </div>

      <div className="mt-8 flex justify-between items-center">
        <Button variant="outline" asChild>
          <Link href="/">Ana Sayfaya Dön</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/terms">Kullanım Koşulları</Link>
        </Button>
      </div>
    </div>
  )
}

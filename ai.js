/**
 * AI Pro Converter - SUPER INTELLIGENT AI Assistant
 * Version 3.0 - Human-like Natural Language Processing
 */

const AI = {
    responses: {},
    isTyping: false,
    conversationHistory: [],
    userMood: 'neutral',
    conversationCount: 0,
    lastInteraction: Date.now(),

    init() {
        this.loadResponses();
        this.setupMessageInput();
        this.loadConversationHistory();
        this.detectUserMood();
    },

    loadResponses() {
        this.responses = {
            greetings: [
                'Salom! 👋 Men AI Pro Converter assistentiman. Sizga qanday yordam bera olaman?',
                'Assalomu alaykum! 🌟 Fayllaringizni professional darajada convert qilishda yordam beraman!',
                'Xush kelibsiz! 🚀 Qaysi formatni convert qilmoqchisiz?',
                'Hayrli kun! ✨ Professional konverter xizmatida!',
                'Salom do\'stim! 😊 Bugun qanday yordam kerak?',
                'Hey! 🎉 Fayllaringiz bilan ishlay boshlaysizmi?'
            ],

            mood_happy: [
                'Ajoyib! 🎉 Sizning kayfiyatingiz yaxshi ko\'rinyapti!',
                'Zo\'r! 😄 Bugun sizga yordam berishdan xursandman!',
                'Qoyil! ⭐ Sizning energiyangiz yuqtirdi!',
                'Super! 🌟 Shunday davom eting!'
            ],

            mood_sad: [
                'Tushundim... 😔 Sizga yordam bera olsam yaxshi bo\'lardi.',
                'Xafa bo\'mang! 💙 Men shu yerdaman, yordam beraman.',
                'Hamma narsa yaxshi bo\'ladi! 🌈 Fayl convert qilish kayfiyatni ko\'taradi!',
                'Men sizni tushunaman 😊 Keling, birgalikda muammoni hal qilamiz!'
            ],

            jokes: [
                '😄 Dasturchi nima deb so\'raydi? "Bug bo\'lsa, biz hal qilamiz!"',
                '😂 PDF faylga nima deyiladi? "Portable Document" - xohlagan joyingizda olib yurasiz!',
                '🤣 Excel nima? Hayotingizni jadvalga solish!',
                '😆 Programmist nega qahvaxonaga boradi? Java ichish uchun!',
                '😅 AI ning eng sevimli ovqati? Cookies... yani cookie\'lar! 🍪'
            ],

            motivation: [
                '💪 Siz ajoyib ishlarni qilyapsiz! Davom eting!',
                '⭐ Har bir fayl konvertatsiyasi - yangi muvaffaqiyat!',
                '🚀 Sizning professional yondashuvingiz menga yoqdi!',
                '🌟 Ajoyib! Siz tez o\'rganyapsiz!',
                '🎯 To\'g\'ri yo\'ldasiz! Oldinga!'
            ],

            about_site: `
                <div style="line-height: 2;">
                    <h3 style="color: #667eea; margin-bottom: 20px;">🌐 AI Pro Converter Haqida</h3>
                    
                    <div style="background: rgba(102, 126, 234, 0.1); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                        <h4 style="color: #667eea; margin-bottom: 15px;">🎯 Bizning Maqsadimiz</h4>
                        <p>AI Pro Converter - bu professional fayl konvertatsiya servisi bo'lib, foydalanuvchilarga eng yuqori sifatli va tez xizmat ko'rsatish uchun yaratilgan!</p>
                    </div>

                    <div style="background: rgba(79, 172, 254, 0.1); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                        <h4 style="color: #4facfe; margin-bottom: 15px;">✨ Xususiyatlar</h4>
                        <ul style="margin-left: 20px; line-height: 2;">
                            <li>🤖 AI-powered assistant - aqlli sun'iy intellekt</li>
                            <li>🔄 15+ format qo'llab-quvvatlash</li>
                            <li>⚡ Tez va xavfsiz konvertatsiya</li>
                            <li>💬 Real-time admin support</li>
                            <li>📊 Shaxsiy statistika</li>
                            <li>🎨 Zamonaviy dizayn</li>
                            <li>📱 Mobile-friendly</li>
                        </ul>
                    </div>

                    <div style="background: rgba(0, 255, 100, 0.1); padding: 20px; border-radius: 12px;">
                        <h4 style="color: #00ff64; margin-bottom: 15px;">🛡️ Xavfsizlik</h4>
                        <p>Barcha fayllaringiz 100% xavfsiz! Konvertatsiya brauzeringizda amalga oshiriladi, serverga hech narsa yuklanmaydi. Maxfiyligingiz bizning ustuvor vazifamiz!</p>
                    </div>
                </div>
            `,

            about_team: `
                <div style="line-height: 2;">
                    <h3 style="color: #667eea; margin-bottom: 20px;">👥 Bizning Jamoa</h3>
                    
                    <div style="background: rgba(102, 126, 234, 0.05); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                        <h4 style="color: #667eea; margin-bottom: 15px;">💼 Professional Jamoa</h4>
                        <p>Biz - professional dasturchilar, dizaynerlar va texnologiya ishqibozlaridan iborat jamoamiz. Bizning maqsadimiz - foydalanuvchilarga eng yaxshi tajribani taqdim etish!</p>
                    </div>

                    <div style="background: rgba(79, 172, 254, 0.05); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                        <h4 style="color: #4facfe; margin-bottom: 15px;">🎯 Bizning Qadriyatlar</h4>
                        <ul style="margin-left: 20px; line-height: 2;">
                            <li>✅ Sifat - eng yuqori standartlar</li>
                            <li>⚡ Tezlik - vaqtingizni qadrlaymiz</li>
                            <li>🔒 Xavfsizlik - ma'lumotlaringiz himoyalangan</li>
                            <li>💙 Qo'llab-quvvatlash - 24/7 yordam</li>
                            <li>🚀 Innovatsiya - doimiy rivojlanish</li>
                        </ul>
                    </div>

                    <div style="background: rgba(240, 147, 251, 0.05); padding: 20px; border-radius: 12px;">
                        <h4 style="color: #f093fb; margin-bottom: 15px;">📧 Biz Bilan Bog'laning</h4>
                        <p>Savol yoki takliflaringiz bormi? "admin" deb yozing va biz sizga darhol yordam beramiz! 😊</p>
                    </div>
                </div>
            `,

            programming: `
                <div style="line-height: 2;">
                    <h3 style="color: #667eea; margin-bottom: 20px;">💻 Dasturlash Haqida</h3>
                    
                    <div style="background: rgba(102, 126, 234, 0.1); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                        <h4 style="color: #667eea; margin-bottom: 15px;">🚀 Men Qanday Yaratilganman?</h4>
                        <p>Men zamonaviy web texnologiyalar yordamida yaratilganman:</p>
                        <ul style="margin-left: 20px; line-height: 2; margin-top: 10px;">
                            <li><strong>HTML5</strong> - Tuzilma</li>
                            <li><strong>CSS3</strong> - Dizayn va animatsiyalar</li>
                            <li><strong>JavaScript (ES6+)</strong> - Mantiq va funksionallik</li>
                            <li><strong>AI Algorithms</strong> - Sun'iy intellekt</li>
                        </ul>
                    </div>

                    <div style="background: rgba(79, 172, 254, 0.1); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                        <h4 style="color: #4facfe; margin-bottom: 15px;">📚 Ishlatilgan Kutubxonalar</h4>
                        <ul style="margin-left: 20px; line-height: 2;">
                            <li>📊 <strong>XLSX.js</strong> - Excel processing</li>
                            <li>📄 <strong>Mammoth.js</strong> - Word conversion</li>
                            <li>📕 <strong>PDF-Lib</strong> - PDF generation</li>
                            <li>📖 <strong>PDF.js</strong> - PDF parsing</li>
                        </ul>
                    </div>

                    <div style="background: rgba(0, 255, 100, 0.1); padding: 20px; border-radius: 12px;">
                        <h4 style="color: #00ff64; margin-bottom: 15px;">💡 Dasturlashni O'rganmoqchimisiz?</h4>
                        <p>Ajoyib! Men sizga quyidagilarni tavsiya qilaman:</p>
                        <ul style="margin-left: 20px; line-height: 2; margin-top: 10px;">
                            <li>🌐 HTML/CSS - Web dizayn asoslari</li>
                            <li>⚡ JavaScript - Interaktiv saytlar</li>
                            <li>🎨 Frontend Frameworks - React, Vue</li>
                            <li>🔧 Backend - Node.js, Python</li>
                        </ul>
                        <p style="margin-top: 15px;">💪 Har qanday savol bo'lsa, so'rang!</p>
                    </div>
                </div>
            `,

            file_limits: `
                <div style="line-height: 2;">
                    <h3 style="color: #667eea; margin-bottom: 20px;">📏 Fayl Chegaralari va Ko'rsatmalar</h3>
                    
                    <div style="background: rgba(255, 210, 0, 0.1); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                        <h4 style="color: #ffd200; margin-bottom: 15px;">⚠️ Maksimal Hajmlar</h4>
                        <ul style="margin-left: 20px; line-height: 2;">
                            <li>📄 <strong>Umumiy:</strong> 50 MB</li>
                            <li>📊 <strong>Excel:</strong> 10 MB (optimal), 50 MB (max)</li>
                            <li>📘 <strong>Word:</strong> 20 MB</li>
                            <li>📕 <strong>PDF:</strong> 30 MB</li>
                            <li>📝 <strong>TXT:</strong> 10 MB</li>
                            <li>🖼️ <strong>Images:</strong> 15 MB</li>
                        </ul>
                    </div>

                    <div style="background: rgba(102, 126, 234, 0.1); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                        <h4 style="color: #667eea; margin-bottom: 15px;">⚡ Konvertatsiya Tezligi</h4>
                        <ul style="margin-left: 20px; line-height: 2;">
                            <li>🚀 <strong>0-1 MB:</strong> 1-2 soniya</li>
                            <li>⚡ <strong>1-5 MB:</strong> 3-5 soniya</li>
                            <li>📊 <strong>5-10 MB:</strong> 5-10 soniya</li>
                            <li>🔄 <strong>10-50 MB:</strong> 10-30 soniya</li>
                        </ul>
                    </div>

                    <div style="background: rgba(79, 172, 254, 0.1); padding: 20px; border-radius: 12px;">
                        <h4 style="color: #4facfe; margin-bottom: 15px;">💡 Professional Maslahatlar</h4>
                        <ul style="margin-left: 20px; line-height: 2;">
                            <li>📉 Katta fayllarni kichikroq qismlarga bo'ling</li>
                            <li>🗜️ Rasmlarni siqib, hajmni kamaytiring</li>
                            <li>📊 Ko'p sahifali Excel uchun CSV ishlatiladi</li>
                            <li>⚡ Tezlik uchun 5MB dan kichik fayllar optimal</li>
                        </ul>
                    </div>
                </div>
            `,

            help: `
                <div style="line-height: 1.9;">
                    <h3 style="color: #667eea; margin-bottom: 20px;">📚 AI Pro Converter - To'liq Qo'llanma</h3>
                    
                    <div style="background: rgba(102, 126, 234, 0.1); padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                        <h4 style="color: #667eea; margin-bottom: 10px;">🔄 Qo'llab-quvvatlanadigan Konvertatsiyalar:</h4>
                        <ul style="margin-left: 20px; line-height: 2;">
                            <li><strong>Excel/CSV</strong> → PDF, TXT, HTML, JSON</li>
                            <li><strong>Word (DOCX)</strong> → PDF, TXT, HTML</li>
                            <li><strong>PDF</strong> → TXT, HTML (matn chiqarish)</li>
                            <li><strong>TXT</strong> → PDF, HTML, XLSX</li>
                            <li><strong>JSON/XML</strong> → XLSX, CSV, HTML, TXT</li>
                            <li><strong>HTML/CSS/JS</strong> → PDF, TXT</li>
                            <li><strong>Rasmlar</strong> → PDF, format o'zgartirish</li>
                        </ul>
                    </div>

                    <h4 style="margin-top: 25px; color: #667eea;">💡 Qanday Ishlatish:</h4>
                    <ol style="margin-left: 20px; line-height: 2;">
                        <li><strong>Faylni yuklang:</strong> "Faylni yuklang" tugmasini bosing yoki drag & drop qiling</li>
                        <li><strong>Format tanlang:</strong> Ko'rsatiladigan format tugmalaridan birini tanlang</li>
                        <li><strong>Yuklab oling:</strong> Fayl avtomatik yuklab olinadi!</li>
                    </ol>

                    <h4 style="margin-top: 25px; color: #667eea;">⚡ Tez Buyruqlar:</h4>
                    <ul style="margin-left: 20px; line-height: 2;">
                        <li><strong>"excel"</strong> - Excel haqida batafsil</li>
                        <li><strong>"pdf"</strong> - PDF konvertatsiya</li>
                        <li><strong>"word"</strong> - Word hujjatlar</li>
                        <li><strong>"formatlar"</strong> - Barcha formatlar ro'yxati</li>
                        <li><strong>"maslahat"</strong> - Professional maslahatlar</li>
                        <li><strong>"admin"</strong> - Admin bilan bog'lanish</li>
                    </ul>

                    <h4 style="margin-top: 25px; color: #667eea;">📞 Yordam:</h4>
                    <p>Muammo yuzaga keldimi? "admin" yoki "muammo" deb yozing va admin sizga yordam beradi!</p>

                    <div style="margin-top: 20px; padding: 15px; background: rgba(79, 172, 254, 0.1); border-radius: 10px;">
                        <p style="margin: 0;">💡 <strong>Pro maslahat:</strong> Katta fayllar uchun (10MB+) konvertatsiya biroz vaqt olishi mumkin. Sabr qiling! 😊</p>
                    </div>
                </div>
            `,

            guide: `
                <div style="line-height: 1.9;">
                    <h3 style="color: #667eea; margin-bottom: 20px;">📖 Boshlang'ich Qo'llanma</h3>
                    
                    <div style="background: rgba(102, 126, 234, 0.05); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                        <h4 style="color: #667eea; margin-bottom: 15px;">1️⃣ Fayl Yuklash</h4>
                        <p>Faylni ikki usulda yuklashingiz mumkin:</p>
                        <ul style="margin-left: 20px; margin-top: 10px;">
                            <li>📁 "Faylni yuklang" tugmasini bosing</li>
                            <li>🖱️ Faylni yuklash maydoniga sudrab olib keling (drag & drop)</li>
                        </ul>
                    </div>

                    <div style="background: rgba(79, 172, 254, 0.05); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                        <h4 style="color: #4facfe; margin-bottom: 15px;">2️⃣ Format Tanlash</h4>
                        <p>Fayl yuklangandan keyin, quyidagi format tugmalari paydo bo'ladi. Kerakli formatni tanlang:</p>
                        <ul style="margin-left: 20px; margin-top: 10px;">
                            <li>📕 PDF - Universal format</li>
                            <li>📊 CSV - Ma'lumotlar bazasi</li>
                            <li>📝 TXT - Oddiy matn</li>
                            <li>🌐 HTML - Veb sahifa</li>
                        </ul>
                    </div>

                    <div style="background: rgba(240, 147, 251, 0.05); padding: 20px; border-radius: 12px;">
                        <h4 style="color: #f093fb; margin-bottom: 15px;">3️⃣ Yuklab Olish</h4>
                        <p>Konvertatsiya tugagach, fayl avtomatik yuklab olinadi! 🎉</p>
                        <p style="margin-top: 10px; color: var(--gray); font-size: 14px;">
                            💡 Agar fayl yuklanmasa, brauzeringizning yuklanmalar papkasini tekshiring.
                        </p>
                    </div>
                </div>
            `,

            excel: `
                <div style="line-height: 1.9;">
                    <h3 style="color: #667eea; margin-bottom: 20px;">📊 Excel & CSV - Professional Guide</h3>
                    
                    <div style="background: rgba(0, 255, 100, 0.05); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                        <h4 style="color: #00ff64; margin-bottom: 15px;">✅ Qo'llab-quvvatlanadigan Formatlar:</h4>
                        <ul style="margin-left: 20px; line-height: 2;">
                            <li><strong>XLSX</strong> - Microsoft Excel (2007+)</li>
                            <li><strong>XLS</strong> - Eski Excel formati</li>
                            <li><strong>CSV</strong> - Comma-Separated Values</li>
                        </ul>
                    </div>

                    <div style="background: rgba(102, 126, 234, 0.05); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                        <h4 style="color: #667eea; margin-bottom: 15px;">🔄 Convert Imkoniyatlari:</h4>
                        <ul style="margin-left: 20px; line-height: 2;">
                            <li>📕 <strong>PDF</strong> - Professional hisobot, chop etish</li>
                            <li>📊 <strong>CSV</strong> - Database import, Excel</li>
                            <li>📝 <strong>TXT</strong> - Oddiy matn formati</li>
                            <li>🌐 <strong>HTML</strong> - Veb jadval, onlayn ko'rish</li>
                            <li>📋 <strong>JSON</strong> - API, dasturlash</li>
                        </ul>
                    </div>

                    <div style="background: rgba(255, 210, 0, 0.05); padding: 20px; border-radius: 12px;">
                        <h4 style="color: #ffd200; margin-bottom: 15px;">💡 Professional Maslahatlar:</h4>
                        <ul style="margin-left: 20px; line-height: 2;">
                            <li>🎯 Katta jadvallar (10,000+ qator) uchun CSV tavsiya etiladi</li>
                            <li>📊 Ma'lumotlar tahlili uchun JSON optimal</li>
                            <li>📄 Chop etish uchun PDF eng yaxshi tanlov</li>
                            <li>🌐 Veb saytda ko'rsatish uchun HTML ishlatiladi</li>
                        </ul>
                    </div>
                </div>
            `,

            pdf: `
                <div style="line-height: 1.9;">
                    <h3 style="color: #667eea; margin-bottom: 20px;">📕 PDF - Complete Guide</h3>
                    
                    <div style="background: rgba(255, 87, 108, 0.05); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                        <h4 style="color: #f5576c; margin-bottom: 15px;">📄 PDF nima?</h4>
                        <p>PDF (Portable Document Format) - universal hujjat formati. Har qanday qurilmada bir xil ko'rinadi.</p>
                    </div>

                    <div style="background: rgba(79, 172, 254, 0.05); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                        <h4 style="color: #4facfe; margin-bottom: 15px;">🔄 PDF Konvertatsiyasi:</h4>
                        <p><strong>PDF dan chiqarish:</strong></p>
                        <ul style="margin-left: 20px; margin-top: 10px; line-height: 2;">
                            <li>📝 <strong>TXT</strong> - Toza matn (tahrirlash uchun)</li>
                            <li>🌐 <strong>HTML</strong> - Veb format (onlayn ko'rish)</li>
                        </ul>
                        
                        <p style="margin-top: 20px;"><strong>PDF ga aylantirish:</strong></p>
                        <ul style="margin-left: 20px; margin-top: 10px; line-height: 2;">
                            <li>📊 Excel, CSV → PDF</li>
                            <li>📘 Word → PDF</li>
                            <li>📝 TXT → PDF</li>
                            <li>🌐 HTML → PDF</li>
                        </ul>
                    </div>

                    <div style="background: rgba(255, 210, 0, 0.05); padding: 20px; border-radius: 12px;">
                        <h4 style="color: #ffd200; margin-bottom: 15px;">⚠️ Muhim Eslatmalar:</h4>
                        <ul style="margin-left: 20px; line-height: 2;">
                            <li>🖼️ Skanerlangan PDF'lardan matn chiqmaydi (rasm sifatida)</li>
                            <li>📄 Eng yaxshi natija uchun matnli PDF ishlatiladi</li>
                            <li>🔒 Parol bilan himoyalangan PDF'lar qo'llab-quvvatlanmaydi</li>
                            <li>📏 Maksimal hajm: 50MB</li>
                        </ul>
                    </div>
                </div>
            `,

            word: `
                <div style="line-height: 1.9;">
                    <h3 style="color: #667eea; margin-bottom: 20px;">📘 Word Documents - Guide</h3>
                    
                    <div style="background: rgba(102, 126, 234, 0.05); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                        <h4 style="color: #667eea; margin-bottom: 15px;">📄 Qo'llab-quvvatlanadigan:</h4>
                        <ul style="margin-left: 20px; line-height: 2;">
                            <li><strong>DOCX</strong> - Microsoft Word (2007+) ✅ Tavsiya etiladi</li>
                            <li><strong>DOC</strong> - Eski Word formati</li>
                        </ul>
                    </div>

                    <div style="background: rgba(79, 172, 254, 0.05); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                        <h4 style="color: #4facfe; margin-bottom: 15px;">🔄 Konvertatsiya:</h4>
                        <ul style="margin-left: 20px; line-height: 2;">
                            <li>📕 <strong>PDF</strong> - Universal, chop etish</li>
                            <li>📝 <strong>TXT</strong> - Oddiy matn</li>
                            <li>🌐 <strong>HTML</strong> - Veb sahifa</li>
                        </ul>
                    </div>

                    <div style="background: rgba(0, 255, 100, 0.05); padding: 20px; border-radius: 12px;">
                        <h4 style="color: #00ff64; margin-bottom: 15px;">💡 Maslahatlar:</h4>
                        <ul style="margin-left: 20px; line-height: 2;">
                            <li>📄 DOCX yangi va yaxshi format</li>
                            <li>🖼️ Rasmlar ham konvert qilinadi</li>
                            <li>📐 Formatlanish saqlangan holda</li>
                            <li>📏 Maksimal: 50MB</li>
                        </ul>
                    </div>
                </div>
            `,

            formats: `
                <div style="line-height: 1.9;">
                    <h3 style="color: #667eea; margin-bottom: 20px;">📋 Barcha Formatlar Ro'yxati</h3>
                    
                    <div style="display: grid; gap: 15px;">
                        <div style="background: rgba(102, 126, 234, 0.05); padding: 15px; border-radius: 10px;">
                            <h4 style="color: #667eea;">📊 Spreadsheets</h4>
                            <p style="margin-top: 10px;">XLSX, XLS, CSV → PDF, TXT, HTML, JSON</p>
                        </div>

                        <div style="background: rgba(79, 172, 254, 0.05); padding: 15px; border-radius: 10px;">
                            <h4 style="color: #4facfe;">📘 Documents</h4>
                            <p style="margin-top: 10px;">DOCX, DOC → PDF, TXT, HTML</p>
                        </div>

                        <div style="background: rgba(255, 87, 108, 0.05); padding: 15px; border-radius: 10px;">
                            <h4 style="color: #f5576c;">📕 PDF</h4>
                            <p style="margin-top: 10px;">PDF → TXT, HTML (matn chiqarish)</p>
                        </div>

                        <div style="background: rgba(0, 255, 100, 0.05); padding: 15px; border-radius: 10px;">
                            <h4 style="color: #00ff64;">📝 Text Files</h4>
                            <p style="margin-top: 10px;">TXT → PDF, HTML, XLSX</p>
                        </div>

                        <div style="background: rgba(240, 147, 251, 0.05); padding: 15px; border-radius: 10px;">
                            <h4 style="color: #f093fb;">💻 Code Files</h4>
                            <p style="margin-top: 10px;">JSON, XML, HTML, CSS, JS → multiple formats</p>
                        </div>

                        <div style="background: rgba(255, 210, 0, 0.05); padding: 15px; border-radius: 10px;">
                            <h4 style="color: #ffd200;">🖼️ Images</h4>
                            <p style="margin-top: 10px;">PNG, JPG, JPEG → PDF, format conversion</p>
                        </div>
                    </div>
                </div>
            `,

            tips: `
                <div style="line-height: 1.9;">
                    <h3 style="color: #667eea; margin-bottom: 20px;">💡 Professional Maslahatlar</h3>
                    
                    <div style="background: rgba(102, 126, 234, 0.05); padding: 20px; border-radius: 12px; margin-bottom: 15px;">
                        <h4 style="color: #667eea;">🚀 Tezlik</h4>
                        <ul style="margin-left: 20px; margin-top: 10px; line-height: 2;">
                            <li>Kichik fayllar (1MB gacha) - 1-2 soniya</li>
                            <li>O'rta fayllar (5MB gacha) - 3-5 soniya</li>
                            <li>Katta fayllar (10MB+) - 10-20 soniya</li>
                        </ul>
                    </div>

                    <div style="background: rgba(79, 172, 254, 0.05); padding: 20px; border-radius: 12px; margin-bottom: 15px;">
                        <h4 style="color: #4facfe;">📏 Hajm Chegaralari</h4>
                        <ul style="margin-left: 20px; margin-top: 10px; line-height: 2;">
                            <li>Maksimal fayl hajmi: 50MB</li>
                            <li>PDF: Cheksiz sahifalar</li>
                            <li>Excel: 100,000 qator</li>
                        </ul>
                    </div>

                    <div style="background: rgba(0, 255, 100, 0.05); padding: 20px; border-radius: 12px;">
                        <h4 style="color: #00ff64;">✅ Best Practices</h4>
                        <ul style="margin-left: 20px; margin-top: 10px; line-height: 2;">
                            <li>📊 Ma'lumotlar uchun: CSV yoki JSON</li>
                            <li>📄 Hujjatlar uchun: PDF universal</li>
                            <li>🌐 Veb uchun: HTML optimal</li>
                            <li>💾 Arxiv uchun: XLSX yoki PDF</li>
                        </ul>
                    </div>
                </div>
            `,

            unknown: [
                'Kechirasiz, tushunmadim. 🤔 "yordam" deb yozing yoki aniqroq savol bering!',
                'Bu haqda aniq ma\'lumot bera olmayman. "yordam" yoki "qo\'llanma" deb yozing! 💡',
                'Tushunmadim. Faylni yuklang yoki "yordam" buyrug\'ini ishlating! 📁'
            ],

            thanks: [
                'Arzimaydi! 😊 Yana yordam kerakmi?',
                'Xursand bo\'ldim yordam berganimdan! 🎉 Boshqa savol bormi?',
                'Marhamat! ✨ Yana fayl convert qilamizmi?',
                'Hech gap emas! 💙 Doim xizmatdaman!'
            ]
        };
    },

    setupMessageInput() {
        const input = $('messageInput');
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }
    },

    loadConversationHistory() {
        const history = Storage.load(`chat_${Auth.currentUser}`, []);
        this.conversationHistory = history;
    },

    saveConversationHistory() {
        Storage.save(`chat_${Auth.currentUser}`, this.conversationHistory.slice(-50));
    },

    addMessage(type, text) {
        const container = $('chatContainer');
        if (!container) return;

        const message = document.createElement('div');
        message.className = `message message-${type}`;
        
        const time = new Date().toLocaleTimeString('uz-UZ', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        message.innerHTML = `
            ${text}
            <div class="message-time">${time}</div>
        `;
        
        container.appendChild(message);
        container.scrollTop = container.scrollHeight;

        // Save to history
        this.conversationHistory.push({
            type: type,
            text: text,
            time: new Date().toISOString()
        });
        this.saveConversationHistory();

        // Update stats for user messages
        if (type === 'user' && typeof Brain !== 'undefined') {
            Brain.userStats.messages++;
            Brain.updateStats();
            Brain.saveUserStats();
        }
    },

    async sendMessage() {
        const input = $('messageInput');
        const message = input.value.trim();

        if (!message || this.isTyping) return;

        // Update last interaction
        this.lastInteraction = Date.now();

        this.addMessage('user', message);
        input.value = '';

        Utils.log(Auth.currentUser, `AI xabar: ${message.substring(0, 50)}...`, 'message');

        this.showTyping();

        // Simulate thinking time based on message complexity
        const thinkingTime = Math.min(1500, 500 + message.length * 10);
        await new Promise(resolve => setTimeout(resolve, thinkingTime));
        
        const response = await this.processMessage(message);
        
        this.hideTyping();
        this.addMessage('ai', response);
    },

    async processMessage(message) {
        const lower = message.toLowerCase();
        this.conversationCount++;

        // Check for file size concerns
        if (this.matchPattern(lower, ['katta', 'hajm', 'size', 'yukla', 'qancha'])) {
            if (this.matchPattern(lower, ['max', 'maksimal', 'limit', 'chegara'])) {
                return this.responses.file_limits;
            }
        }

        // Detect mood from message
        this.detectMoodFromMessage(lower);

        // Greetings with mood
        if (this.matchPattern(lower, ['salom', 'assalom', 'hello', 'hi', 'hey', 'hayr'])) {
            let greeting = this.getRandomResponse(this.responses.greetings);
            if (this.userMood === 'happy') {
                greeting += '<br><br>' + this.getRandomResponse(this.responses.mood_happy);
            } else if (this.userMood === 'sad') {
                greeting += '<br><br>' + this.getRandomResponse(this.responses.mood_sad);
            }
            return greeting;
        }

        // Jokes and fun
        if (this.matchPattern(lower, ['hazil', 'kulgi', 'joke', 'funny', 'zerikdim', 'zerikaman'])) {
            return '😄 Ha-ha! Mana sizga:<br><br>' + this.getRandomResponse(this.responses.jokes) + '<br><br>Kayfiyatingiz yaxshilardimi? 😊';
        }

        // Motivation
        if (this.matchPattern(lower, ['motivatsiya', 'ilhom', 'charchadim', 'qiyin'])) {
            return this.getRandomResponse(this.responses.motivation) + '<br><br>Siz bunga qodirsiz! Men sizga ishonaman! 💪✨';
        }

        // About site
        if (this.matchPattern(lower, ['site', 'sayt', 'about', 'haqida', 'bu nima'])) {
            return this.responses.about_site;
        }

        // About team
        if (this.matchPattern(lower, ['jamoa', 'team', 'kim', 'yaratgan', 'dasturchi'])) {
            return this.responses.about_team;
        }

        // Programming
        if (this.matchPattern(lower, ['dasturlash', 'kod', 'programming', 'code', 'qanday yasalgan', 'texnologiya'])) {
            return this.responses.programming;
        }

        // File size limits
        if (this.matchPattern(lower, ['hajm', 'size', 'limit', 'maksimal', 'katta', 'qancha'])) {
            return this.responses.file_limits;
        }

        // Admin contact with smart detection
        if (this.matchPattern(lower, ['admin', 'muammo', 'problem', 'xato', 'error', 'help me', 'yordam kerak'])) {
            return this.handleAdminRequest(message);
        }

        // Smart help
        if (this.matchPattern(lower, ['yordam', 'help', 'qanday', 'qilib', 'bilmayman'])) {
            return this.getContextualHelp();
        }

        // Other patterns...
        if (this.matchPattern(lower, ['guide', 'qo\'llanma', 'boshlash'])) {
            return this.responses.guide;
        }

        if (this.matchPattern(lower, ['excel', 'xlsx', 'xls', 'csv', 'jadval'])) {
            return this.responses.excel;
        }

        if (this.matchPattern(lower, ['pdf'])) {
            return this.responses.pdf;
        }

        if (this.matchPattern(lower, ['word', 'docx', 'doc', 'hujjat'])) {
            return this.responses.word;
        }

        if (this.matchPattern(lower, ['format', 'qaysi', 'nima', 'ro\'yxat'])) {
            return this.responses.formats;
        }

        if (this.matchPattern(lower, ['maslahat', 'tip', 'tavsiya'])) {
            return this.responses.tips;
        }

        // Thanks
        if (this.matchPattern(lower, ['rahmat', 'thanks', 'tashakkur', 'spasibo'])) {
            return this.getRandomResponse(this.responses.thanks) + '<br><br>' + this.getRandomResponse(this.responses.motivation);
        }

        // File upload
        if (this.matchPattern(lower, ['fayl', 'file', 'yukla', 'upload'])) {
            return '📁 Faylni yuklash juda oson!<br><br><strong>2 usul:</strong><br>1️⃣ "Faylni yuklang" tugmasini bosing<br>2️⃣ Faylni drag & drop qiling<br><br>💡 <strong>Qo\'llab-quvvatlanadigan:</strong> Excel, Word, PDF, CSV, TXT, JSON, XML, HTML, CSS, JS, Rasmlar<br><br>📏 <strong>Max hajm:</strong> 50 MB';
        }

        // About AI
        if (this.matchPattern(lower, ['sen kimsan', 'nima', 'kim', 'ai'])) {
            return `
                <div style="line-height: 1.8;">
                    <h3 style="color: #667eea; margin-bottom: 15px;">🤖 Men - AI Assistant</h3>
                    <p>Men <strong>AI Pro Converter</strong> ning sun'iy intellekt yordamchisiman!</p>
                    <p style="margin-top: 15px;">📌 <strong>Mening qobiliyatlarim:</strong></p>
                    <ul style="margin-left: 20px; line-height: 2; margin-top: 10px;">
                        <li>💬 100+ savolga javob beraman</li>
                        <li>🔄 Fayl konvertatsiyasida yordam beraman</li>
                        <li>📚 Formatlar haqida ma'lumot beraman</li>
                        <li>😊 Kayfiyatingizni ko'taraman</li>
                        <li>💡 Professional maslahatlar beraman</li>
                        <li>🛡️ Admin bilan bog'layman (kerak bo'lsa)</li>
                        <li>💻 Dasturlash haqida gaplashaman</li>
                    </ul>
                    <p style="margin-top: 15px;">💙 Men 24/7 shu yerdaman! Nima kerak bo'lsa, so'rang!</p>
                </div>
            `;
        }

        // Statistics
        if (this.matchPattern(lower, ['stat', 'statistika', 'hisobot', 'natija'])) {
            return `
                <div style="line-height: 1.8;">
                    <h3 style="color: #667eea; margin-bottom: 15px;">📊 Sizning Statistikangiz</h3>
                    <div style="background: rgba(102, 126, 234, 0.1); padding: 20px; border-radius: 12px;">
                        <ul style="margin-left: 20px; line-height: 2.5;">
                            <li>📁 <strong>Yuklangan fayllar:</strong> ${Brain.userStats.files}</li>
                            <li>🔄 <strong>Konvertatsiyalar:</strong> ${Brain.userStats.converts}</li>
                            <li>💬 <strong>Xabarlar:</strong> ${Brain.userStats.messages}</li>
                            <li>🎯 <strong>Suhbat davomiyligi:</strong> ${this.conversationCount} xabar</li>
                        </ul>
                    </div>
                    <p style="margin-top: 15px;">🎉 ${this.getMotivationByStats()}</p>
                </div>
            `;
        }

        // Weather (fun response)
        if (this.matchPattern(lower, ['ob-havo', 'weather', 'havo'])) {
            return '🌤️ Kechirasiz, men ob-havo haqida ma\'lumot berolmayman, lekin fayllaringizni har qanday ob-havoda convert qila olaman! 😄<br><br>Fayl yuklaysizmi?';
        }

        // Time
        if (this.matchPattern(lower, ['soat', 'time', 'vaqt'])) {
            const now = new Date();
            const time = now.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
            return `🕐 Hozir soat <strong>${time}</strong><br><br>Vaqtingizni tejash uchun fayllaringizni tez convert qilaman! ⚡`;
        }

        // Compliments
        if (this.matchPattern(lower, ['zo\'r', 'ajoyib', 'yaxshi', 'super', 'perfect', 'great'])) {
            return this.getRandomResponse(this.responses.motivation) + '<br><br>😊 Sizga xizmat qilish menga mamnuniyat bag\'ishlaydi!';
        }

        // Default with contextual help
        return this.getSmartDefaultResponse(message);
    },

    detectMoodFromMessage(message) {
        const happyWords = ['zo\'r', 'ajoyib', 'yaxshi', 'super', 'perfect', 'great', 'happy', 'baxtli'];
        const sadWords = ['yomon', 'xafa', 'sad', 'charchadim', 'zerikdim', 'muammo', 'qiyin'];

        const happyCount = happyWords.filter(word => message.includes(word)).length;
        const sadCount = sadWords.filter(word => message.includes(word)).length;

        if (happyCount > sadCount) {
            this.userMood = 'happy';
        } else if (sadCount > happyCount) {
            this.userMood = 'sad';
        } else {
            this.userMood = 'neutral';
        }
    },

    getMotivationByStats() {
        const total = Brain.userStats.files + Brain.userStats.converts;
        if (total === 0) return 'Keling, birinchi faylingizni convert qilaylik! 🚀';
        if (total < 5) return 'Ajoyib boshlanish! Davom eting! 💪';
        if (total < 10) return 'Siz professional bo\'lib borayapsiz! ⭐';
        if (total < 20) return 'Zo\'r natijalar! Siz ustasiz! 🏆';
        return 'Ajoyib! Siz haqiqiy professional! 👑';
    },

    handleAdminRequest(message) {
        // Open chat with smooth animation
        setTimeout(() => {
            ChatWithAdmin.openChat();
        }, 800);

        return `
            <div style="line-height: 1.8; animation: slideIn 0.5s ease;">
                <h3 style="color: #667eea; margin-bottom: 15px;">💬 Admin Bilan Bog'lanish</h3>
                
                <div style="background: rgba(102, 126, 234, 0.1); padding: 20px; border-radius: 12px; margin-bottom: 15px;">
                    <p><strong>✅ Admin chat ochildi!</strong></p>
                    <p style="margin-top: 10px;">Endi admin bilan to'g'ridan-to'g'ri suhbatlashishingiz mumkin.</p>
                </div>

                <div style="background: rgba(79, 172, 254, 0.05); padding: 15px; border-radius: 10px;">
                    <p><strong>📝 Muammoingizni yozing:</strong></p>
                    <p style="color: var(--gray); font-size: 14px; margin-top: 8px;">
                        Admin tez orada javob beradi. O'rtacha javob vaqti: 2-5 daqiqa ⏱️
                    </p>
                </div>

                <p style="margin-top: 15px;">💡 <strong>Maslahat:</strong> Muammoni aniq va batafsil tasvirlang, shunda admin tezroq yordam beradi!</p>
            </div>
        `;
    },

    getContextualHelp() {
        const hasFiles = Brain.userStats.files > 0;
        const hasConverts = Brain.userStats.converts > 0;

        if (!hasFiles) {
            return '📁 <strong>Boshlash uchun:</strong><br><br>1️⃣ Faylni yuklang<br>2️⃣ Format tanlang<br>3️⃣ Yuklab oling!<br><br>Juda oddiy! 😊<br><br>To\'liq qo\'llanma kerakmi? "qo\'llanma" deb yozing!';
        } else if (!hasConverts) {
            return '👍 Siz fayl yuklagansiz!<br><br>Endi format tugmasini bosing va konvertatsiya boshlanadi!<br><br>Savollaringiz bormi? So\'rang! 😊';
        } else {
            return this.responses.help;
        }
    },

    getSmartDefaultResponse(message) {
        const responses = [
            `🤔 "${message.substring(0, 30)}..." haqida aniq ma'lumot berolmayman.<br><br>Lekin men quyidagilarda yordam bera olaman:<br>• Fayl konvertatsiya<br>• Formatlar haqida<br>• Professional maslahatlar<br><br>Savolingizni aniqlashtirsangiz yaxshi bo'lardi! 😊`,
            `Hmm... Men bu haqda yaxshi bilmayman. 🤷‍♂️<br><br>Lekin sizga quyidagilarda yordam bera olaman:<br>✅ Fayl convert qilish<br>✅ Format tanlash<br>✅ Maslahat berish<br><br>"yordam" deb yozing! 💡`,
            `Kechirasiz, tushunmadim. 😅<br><br>Men fayl konvertatsiyasiga ixtisoslashganman!<br><br>📌 <strong>Masalan, so'rang:</strong><br>• "Excel ni PDF ga o'tkaz"<br>• "Formatlar ro'yxati"<br>• "Qo'llanma"<br><br>Yordam beraman! 🚀`
        ];

        return responses[Math.floor(Math.random() * responses.length)];
    },

    detectUserMood() {
        setInterval(() => {
            const timeSinceLastInteraction = Date.now() - this.lastInteraction;
            
            // If user inactive for 2 minutes
            if (timeSinceLastInteraction > 120000 && this.conversationCount > 0) {
                this.addMessage('ai', '👋 Hali bu yerdamisiz?<br><br>Agar yordam kerak bo\'lsa, yozing! Men doim tayyorman! 😊');
                this.lastInteraction = Date.now();
            }
        }, 60000);
    },

    matchPattern(message, patterns) {
        return patterns.some(pattern => message.includes(pattern));
    },

    getRandomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    },

    showTyping() {
        this.isTyping = true;
        const loader = $('chatLoader');
        if (loader) loader.classList.remove('hidden');
    },

    hideTyping() {
        this.isTyping = false;
        const loader = $('chatLoader');
        if (loader) loader.classList.add('hidden');
    },

    showHelp() {
        this.addMessage('ai', this.responses.help);
        const container = $('chatContainer');
        if (container) container.scrollTop = container.scrollHeight;
    },

    showGuide() {
        this.addMessage('ai', this.responses.guide);
        const container = $('chatContainer');
        if (container) container.scrollTop = container.scrollHeight;
    },

    clearChat() {
        if (!confirm('Chatni tozalamoqchimisiz?')) return;
        
        const container = $('chatContainer');
        if (container) container.innerHTML = '';
        
        this.conversationHistory = [];
        this.saveConversationHistory();
        
        Utils.notify('Chat tozalandi!', 'success');
        
        // Welcome message
        this.addMessage('ai', `Salom, ${Auth.currentUser}! 👋<br><br>Chat tozalandi. Yangi savol bering yoki faylni yuklang! 😊`);
    }
};

/**
 * Chat with Admin Module - Enhanced Version
 */
const ChatWithAdmin = {
    isOpen: false,
    currentChatUser: null,
    checkInterval: null,

    init() {
        this.startCheckingMessages();
    },

    openChat() {
        const modal = $('userChatModal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.style.animation = 'fadeIn 0.3s ease';
            this.isOpen = true;
            this.loadMessages();
            this.markAsRead();
            
            // Focus on input
            setTimeout(() => {
                const input = $('userChatInput');
                if (input) input.focus();
            }, 300);
        }
    },

    closeChat() {
        const modal = $('userChatModal');
        if (modal) {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                modal.classList.add('hidden');
                this.isOpen = false;
            }, 300);
        }
    },

    loadMessages() {
        const container = $('userChatMessages');
        if (!container) return;

        const chats = Storage.load('adminChats', {});
        const userChat = chats[Auth.currentUser] || { messages: [], unread: 0 };

        container.innerHTML = '';

        if (userChat.messages.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 50px 20px; color: var(--gray);">
                    <svg viewBox="0 0 24 24" width="80" height="80" style="opacity: 0.3; margin-bottom: 20px;">
                        <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                    </svg>
                    <h3 style="margin-bottom: 15px;">💬 Suhbat Bo'sh</h3>
                    <p>Admin bilan suhbatni boshlang!</p>
                    <p style="margin-top: 10px; font-size: 14px; color: var(--gray);">Muammo yoki savolingizni yozing</p>
                </div>
            `;
            return;
        }

        userChat.messages.forEach((msg, index) => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-message ${msg.from}`;
            messageDiv.style.animation = `slideIn 0.3s ease ${index * 0.05}s both`;
            messageDiv.innerHTML = `
                <div style="word-wrap: break-word;">${msg.text}</div>
                <div style="font-size: 11px; opacity: 0.7; margin-top: 5px; display: flex; justify-content: space-between; align-items: center;">
                    <span>${msg.time}</span>
                    ${msg.from === 'user' && msg.read ? '<span>✓✓</span>' : ''}
                </div>
            `;
            container.appendChild(messageDiv);
        });

        setTimeout(() => {
            container.scrollTop = container.scrollHeight;
        }, 100);
    },

    sendMessage() {
        const input = $('userChatInput');
        if (!input) return;

        const message = input.value.trim();
        if (!message) {
            Utils.notify('Xabar yozing!', 'warning');
            return;
        }

        const chats = Storage.load('adminChats', {});
        if (!chats[Auth.currentUser]) {
            chats[Auth.currentUser] = {
                messages: [],
                unread: 0,
                lastUpdate: new Date().toISOString()
            };
        }

        const time = new Date().toLocaleString('uz-UZ', {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit'
        });

        chats[Auth.currentUser].messages.push({
            from: 'user',
            text: message,
            time: time,
            timestamp: new Date().toISOString(),
            read: false
        });

        chats[Auth.currentUser].lastUpdate = new Date().toISOString();
        chats[Auth.currentUser].unread++;

        Storage.save('adminChats', chats);

        input.value = '';
        this.loadMessages();

        // Show success with animation
        const sendBtn = event.target;
        sendBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            sendBtn.style.transform = 'scale(1)';
        }, 200);

        Utils.log(Auth.currentUser, `Admin ga xabar: ${message.substring(0, 30)}...`, 'chat');
        
        // Show notification
        this.showChatNotification('✓ Yuborildi!');
    },

    showChatNotification(text) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #4facfe, #00f2fe);
            color: white;
            padding: 12px 24px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(79, 172, 254, 0.4);
            z-index: 10001;
            animation: slideInRight 0.3s ease;
            font-weight: 600;
        `;
        notification.textContent = text;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    },

    checkUnreadMessages() {
        const chats = Storage.load('adminChats', {});
        const userChat = chats[Auth.currentUser];

        if (!userChat) return;

        const unreadFromAdmin = userChat.messages.filter(
            msg => msg.from === 'admin' && !msg.read
        ).length;

        const badge = $('unreadCount');
        if (badge) {
            if (unreadFromAdmin > 0) {
                badge.textContent = unreadFromAdmin;
                badge.classList.remove('hidden');
                badge.style.animation = 'pulse 1s infinite';
            } else {
                badge.classList.add('hidden');
            }
        }
    },

    markAsRead() {
        const chats = Storage.load('adminChats', {});
        if (!chats[Auth.currentUser]) return;

        chats[Auth.currentUser].messages.forEach(msg => {
            if (msg.from === 'admin') {
                msg.read = true;
            }
        });

        Storage.save('adminChats', chats);

        const badge = $('unreadCount');
        if (badge) {
            badge.classList.add('hidden');
        }
    },

    startCheckingMessages() {
        // Check every 10 seconds for new admin messages
        this.checkInterval = setInterval(() => {
            this.checkUnreadMessages();
            
            // If chat is open, refresh messages
            if (this.isOpen) {
                this.loadMessages();
            }
        }, 10000);
    },

    stopChecking() {
        if (this.checkInterval) {
            clearInterval(this.checkInterval);
        }
    }
};

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    AI.init();
    ChatWithAdmin.init();
});
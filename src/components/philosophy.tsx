'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Philosophy() {
    return (
        <section id="philosophy" className="py-24 px-6 bg-white overflow-hidden">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-4xl md:text-5xl font-black text-charcoal mb-8"
                            >
                                Her Parçanın <br />
                                <span className="text-clay italic text-3xl md:text-4xl font-normal">"Bir Hikayesi Var"</span>
                            </motion.h2>

                            <div className="space-y-6 text-lg text-charcoal/70 leading-relaxed font-light">
                                <p>
                                    Japonlar der ki; eşyalar sevildikçe canlanır. Biz de atölyemizde tam olarak bunu yapıyoruz.
                                </p>
                                <p>
                                    Her bir Tsuko parçası, saatlerce süren bir üretim yolculuğundan geçer. Kusursuz bir makine çıktısı değil; dokunduğunuzda hissedebileceğiniz, kendine has bir karakteri olan, <strong>sıcak bir arkadaş</strong> gibidir.
                                </p>
                                <p>
                                    Evinizin en güzel köşesinde, size her baktığınızda güzel bir his vermesi için tasarlandı. 🧡
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-6 text-charcoal/70"
                        >
                            <p>
                                Japon folklorundaki <strong>Tsukumogami</strong> inancı, objelerin uzun süre kullanıldıktan sonra bir ruh kazandığını söyler. Biz bu felsefeyi modern teknoloji ile birleştiriyoruz.
                            </p>
                            <p>
                                3D baskı sürecindeki her katman, aslında birer yıllık halka gibidir. Cihazlarımızın ucundan dökülen her polimer hattı, o objeye bir kimlik ve bir &apos;an&apos; katar.
                            </p>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5 }}
                        className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-[3rem] shadow-xl"
                    >
                        {/* Macro abstract image - using kora for its intricate curves */}
                        <Image
                            src="/images/kora.png"
                            alt="3D Printing Texture Macro"
                            fill
                            className="object-cover scale-150 grayscale hover:grayscale-0 transition-all duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
                        <div className="absolute bottom-10 left-10 text-white">
                            <p className="text-4xl font-black opacity-20">LAYERS</p>
                            <p className="text-4xl font-black -mt-4 opacity-10">SPIRIT</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

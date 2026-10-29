// ========================================================
// SCRIPT ANIMASI & PEMODELAN 3D BLENDER OLEH JIHANZ
// Gas Station, Indomaret, Taman & Animasi Mobil Maju-Mundur
// ========================================================

export const BLENDER_PYTHON_SCRIPT = `import bpy

def create_building():
    # Membuat plane
    bpy.ops.mesh.primitive_plane_add(size=200, location=(0, -45, 0))
    plane = bpy.context.active_object
    plane.name = "MyPlane"

    # Tambahkan material baru
    material = bpy.data.materials.new(name="PlaneMaterial")
    material.use_nodes = True
    nodes = material.node_tree.nodes
    links = material.node_tree.links

    # Bersihkan node default
    for node in nodes:
        nodes.remove(node)

    # Tambahkan node yang dibutuhkan
    node_texture = nodes.new(type="ShaderNodeTexImage")  # Node Tekstur Gambar
    node_texture.location = (-300, 0)

    node_principled = nodes.new(type="ShaderNodeBsdfPrincipled")  # Node Shader Principled
    node_principled.location = (0, 0)

    node_output = nodes.new(type="ShaderNodeOutputMaterial")  # Node Output Material
    node_output.location = (300, 0)

    # Hubungkan node
    links.new(node_texture.outputs["Color"], node_principled.inputs["Base Color"])
    links.new(node_principled.outputs["BSDF"], node_output.inputs["Surface"])

    # Tambahkan material ke plane
    plane.data.materials.append(material)

    # Memuat gambar tekstur
    image_path = r"D:\\ANIMASI\\aspal.jpg"  # Masukkan path lengkap file gambar
    try:
        image = bpy.data.images.load(image_path)
        node_texture.image = image
        print("Tekstur berhasil dimuat!")
    except RuntimeError:
        print(f"Error: Tidak dapat memuat file tekstur dari path: {image_path}")

    # Membuat dinding dengan tekstur kaca
    bpy.ops.mesh.primitive_cube_add(size=2, location=(0, 0, 12.3))
    dinding = bpy.context.active_object
    dinding.name = "Dinding"

    # Skala gedung
    dinding.scale = (65, 3, 12)

    # Membuat material dengan warna abu-abu
    material = bpy.data.materials.new(name="Dinding Abu")
    material.use_nodes = True  # Mengaktifkan penggunaan nodes untuk material

    # Mengakses node material
    nodes = material.node_tree.nodes
    links = material.node_tree.links

    # Menghapus node default
    for node in nodes:
        nodes.remove(node)

    # Menambahkan node Shader Principled BSDF
    bsdf_node = nodes.new(type="ShaderNodeBsdfPrincipled")
    bsdf_node.location = (0, 0)

    # Menambahkan node Output Material
    output_node = nodes.new(type="ShaderNodeOutputMaterial")
    output_node.location = (300, 0)

    # Menghubungkan BSDF ke Output
    links.new(bsdf_node.outputs['BSDF'], output_node.inputs['Surface'])

    # Menambahkan node Image Texture
    texture_node = nodes.new(type="ShaderNodeTexImage")
    texture_node.location = (-300, 0)

    # Memuat tekstur
    texture_path = r"D:\\ANIMASI\\kacaw.jpg"  # Path file tekstur kaca
    try:
        image = bpy.data.images.load(texture_path)
        texture_node.image = image
    except RuntimeError:
        pass

    # Menghubungkan Image Texture ke Principled BSDF
    links.new(texture_node.outputs['Color'], bsdf_node.inputs['Base Color'])

    # Menambahkan material ke objek
    dinding.data.materials.append(material)

    # Membuat dinding putih belakang dinding abu
    bpy.ops.mesh.primitive_cube_add(size=2, location=(0, 6, 12.3))
    dinding = bpy.context.active_object
    dinding.name = "Dinidng putih"
    dinding.scale = (65, 3, 12) 
    
    material = bpy.data.materials.new(name="dinding putih")
    material.diffuse_color = (1, 1, 1, 1) 
    dinding.data.materials.append(material) 
    
    # Membuat dinding putih paling belakang 
    bpy.ops.mesh.primitive_cube_add(size=2, location=(0, 20, 15.4))
    dinding = bpy.context.active_object
    dinding.name = "Dinidng putih"
    dinding.scale = (65, 11, 15.3) 
    
    material = bpy.data.materials.new(name="dinding putih")
    material.diffuse_color = (1, 1, 1, 1) 
    dinding.data.materials.append(material) 

    # Membuat bangunan tambahan untuk di atas (Kuning)
    bpy.ops.mesh.primitive_cube_add(size=2, location=(0, 3, 25.3))  
    dinding_2 = bpy.context.active_object
    dinding_2.name = "dinding 2"
    dinding_2.scale = (65, 6, 1.0)

    additional_material = bpy.data.materials.new(name="warna Dinding_2")
    additional_material.diffuse_color = (0.996, 0.81, 0.13, 1)  # Warna kuning
    dinding_2.data.materials.append(additional_material)

    # Membuat bangunan tambahan warna biru untuk di atas
    bpy.ops.mesh.primitive_cube_add(size=2, location=(0, 3, 27.3))
    dinding_3 = bpy.context.active_object
    dinding_3.name = "dinding 3"
    dinding_3.scale = (65, 6, 1.0)

    additional_material = bpy.data.materials.new(name="warna dinding3")
    additional_material.diffuse_color = (0.0, 0.37, 0.78, 1)  # Warna biru
    dinding_3.data.materials.append(additional_material)

    # Membuat gedung 4 (Merah)
    bpy.ops.mesh.primitive_cube_add(size=2, location=(0, 3, 29.3))
    gedung_4 = bpy.context.active_object
    gedung_4.name = "Gedung 4"
    gedung_4.scale = (65, 6, 1.0)

    additional_material = bpy.data.materials.new(name="Gedung4Material")
    additional_material.diffuse_color = (0.84, 0.09, 0.15, 1)  # Warna merah
    gedung_4.data.materials.append(additional_material)

    # Membuat gedung 5 (Putih)
    bpy.ops.mesh.primitive_cube_add(size=2, location=(0, 3, 30.5))
    gedung_5 = bpy.context.active_object
    gedung_5.name = "Gedung 5"
    gedung_5.scale = (65, 6, 0.2)

    additional_material = bpy.data.materials.new(name="Gedung5Material")
    additional_material.diffuse_color = (1, 1, 1, 1)  # Warna putih
    gedung_5.data.materials.append(additional_material)

    # MEMBUAT ATAP PUTIH DIATAS ALAT PENGISIAN BENSIN
    bpy.ops.mesh.primitive_cube_add(size=2, location=(0, -45, 38.3))
    atap_putih = bpy.context.active_object
    atap_putih.name = "atap_putih"
    atap_putih.scale = (30, 40, 2.2)  
    
    additional_material = bpy.data.materials.new(name="atap_putihMaterial")
    additional_material.diffuse_color = (1, 1, 1, 1) 
    atap_putih.data.materials.append(additional_material)

    # MEMBUAT ALAS TIANG 1
    bpy.ops.mesh.primitive_cube_add(size=2, location=(0, -32.1, 1))
    alas_tiang = bpy.context.active_object
    alas_tiang.name = "alas_tiang"
    alas_tiang.scale = (25, 3.5, 0.5)  
    additional_material = bpy.data.materials.new(name="alas_tiangMaterial")
    additional_material.diffuse_color = (1, 1, 1, 1) 
    alas_tiang.data.materials.append(additional_material)

    # MEMBUAT ALAS TIANG 2
    bpy.ops.mesh.primitive_cube_add(size=2, location=(0, -60, 1))
    alas_tiang = bpy.context.active_object
    alas_tiang.name = "alas_tiang"
    alas_tiang.scale = (25, 3.5, 0.5)  
    additional_material = bpy.data.materials.new(name="alas_tiangMaterial")
    additional_material.diffuse_color = (1, 1, 1, 1) 
    alas_tiang.data.materials.append(additional_material)
    
    # Objek alas cone
    locations = [(-32, -32.1, 0.3), (-32, -60.1, 0.2)]
    for i, loc in enumerate(locations):
        bpy.ops.mesh.primitive_cube_add(size=2, location=loc)  
        alas_cone = bpy.context.active_object
        alas_cone.name = f"alas_cone_{i+1}"  
        alas_cone.scale = (3, 3, 0.2)  
        additional_material = bpy.data.materials.new(name=f"alas_coneMaterial_{i+1}")
        additional_material.diffuse_color = (0.8, 0.3, 0, 1) 
        alas_cone.data.materials.append(additional_material)

# Membuat cone
locations = [(-32, -60.1, 5), (-32, -32.1, 5)]
for i, loc in enumerate(locations):
    bpy.ops.mesh.primitive_cone_add(vertices=32, radius1=1, radius2=0, depth=2, location=loc)
    cone = bpy.context.active_object
    cone.name = f"Cone_{i+1}"
    cone.scale = (2, 2, 5)

    cone_material = bpy.data.materials.new(name=f"ConeMaterial_{i+1}")
    cone_material.diffuse_color = (1, 0.5, 0, 1)  # Warna orange
    cone.data.materials.append(cone_material)

# Membuat atap alat pengisian bensin
def create_atap():
    lokasi_atap = [
        (0, -45, 35.6),
        (0, -45, 41)
    ]
    
    for lokasi in lokasi_atap:
        bpy.ops.mesh.primitive_cube_add(size=2, location=lokasi)
        atap_merah = bpy.context.active_object
        atap_merah.name = "Atap_Merah"
        atap_merah.scale = (30, 40, 0.5)
        
        additional_material = bpy.data.materials.new(name="Gedung5Material")
        additional_material.diffuse_color = (1.0, 0.0, 0.0, 1)  # Warna merah (RGBA)
        atap_merah.data.materials.append(additional_material)

create_atap()

# Membuat tiang 
def create_tiang():
    lokasi_tiang = [
        (20, -32, 18),
        (10, -32, 18),
        (-10, -32, 18),
        (-20, -32, 18),
        (20, -60, 18),
        (10, -60, 18),
        (-10, -60, 18),
        (-20, -60, 18)
    ]
    
    for lokasi in lokasi_tiang:
        bpy.ops.mesh.primitive_cylinder_add(vertices=32, radius=1, depth=2, location=lokasi)
        tiang = bpy.context.active_object
        tiang.name = "Tiang"
        tiang.scale = (1, 1, 17)
        
        material_tiang = bpy.data.materials.new(name="TiangMaterial")
        material_tiang.diffuse_color = (1.0, 0.0, 0.0, 1)  # Warna merah (RGBA)
        tiang.data.materials.append(material_tiang)

    # MEMBUAT TAMAN KECIL
    bpy.ops.mesh.primitive_cylinder_add(vertices=32, radius=1, depth=2, location=(0, -100, 1))  
    taman = bpy.context.active_object
    taman.name = "Taman"
    taman.scale = (30, 8, 0.5)  

    material_taman = bpy.data.materials.new(name="tamanMaterial")
    material_taman.diffuse_color = (0.4, 0.4, 0.4, 1)  # Abu-abu
    taman.data.materials.append(material_taman)

    bpy.ops.mesh.primitive_cylinder_add(vertices=32, radius=1, depth=2, location=(0, -100, 1.2))  
    taman = bpy.context.active_object
    taman.name = "Taman"
    taman.scale = (28, 6, 0.5)  

    material_taman = bpy.data.materials.new(name="tamanMaterial")
    material_taman.diffuse_color = (0.2, 0.8, 0.2, 1)  # Hijau 
    taman.data.materials.append(material_taman)

    # Membuat logo indomaret
    bpy.ops.mesh.primitive_cylinder_add(vertices=32, radius=1, depth=2, location=(-50, -3.4, 27.4))    
    taman = bpy.context.active_object
    taman.name = "Taman"
    taman.scale = (7, 2, 0.3)  
    taman.rotation_euler = (1.5708, 0, 0)  # Rotasi 90 derajat pada sumbu X

    material_taman = bpy.data.materials.new(name="tamanMaterial")
    material_taman.diffuse_color = (1, 1, 1, 1)  # Putih
    taman.data.materials.append(material_taman)

create_tiang()
create_building()

# Membuat teks 3D "INDOMARET"
bpy.ops.object.text_add(location=(-50, -3.8, 26.8))
text_object = bpy.context.object
text_object.data.body = "INDOMARET"
text_object.data.extrude = 0.1
text_object.data.bevel_depth = 0.02
text_object.data.align_x = 'CENTER'
text_object.rotation_euler = (1.5708, 0, 0)
text_object.scale = (2, 2, 1)

material = bpy.data.materials.new(name="BlueMaterial")
material.diffuse_color = (0, 0, 1, 1)  # Warna biru (RGBA)
text_object.data.materials.append(material)

# Membuat teks 3D "GAS STATION"
bpy.ops.object.text_add(location=(0.0, -80, 41.9))
text_object = bpy.context.object
text_object.data.body = "GAS STATION" 
text_object.data.extrude = 0.1
text_object.data.bevel_depth = 0.02
text_object.data.align_x = 'CENTER'
text_object.rotation_euler = (1.5708, 0, 0)
text_object.scale = (7, 8, 5)

# Membuat teks 3D "INDOMARET" Utama
bpy.ops.object.text_add(location=(0.0, -1, 30.9))
text_object = bpy.context.object
text_object.data.body = "INDOMARET" 
text_object.data.extrude = 0.1
text_object.data.bevel_depth = 0.02
text_object.data.align_x = 'CENTER'
text_object.rotation_euler = (1.5708, 0, 0)
text_object.scale = (7, 8, 5)

# ========================================================
# MEMBUAT OBJEK MOBIL UTAMA & ANIMASI MAJU-MUNDUR
# ========================================================

# Membuat body utama mobil
bpy.ops.mesh.primitive_cube_add(size=2, location=(0, -46, 4.5))
body = bpy.context.active_object
body.name = "Body"
body.scale = (15, 7, 2.9)
body_material = bpy.data.materials.new(name="BodyMaterial")
body_material.diffuse_color = (0, 0, 128 / 255, 1)
body.data.materials.append(body_material)

# Membuat atap mobil
bpy.ops.mesh.primitive_cube_add(size=2, location=(0, -46, 8.4))
roof = bpy.context.active_object
roof.name = "Roof"
roof.scale = (5, 7, 1.5)
roof_material = bpy.data.materials.new(name="RoofMaterial")
roof_material.diffuse_color = (0, 0, 128 / 255, 1)
roof.data.materials.append(roof_material)

# Membuat ban mobil
wheel_locations = [(8, -53.7, 2.7), (-8, -53.7, 2.7), (8, -38, 2.7), (-8, -38, 2.7)]
wheels = []
for i, loc in enumerate(wheel_locations):
    bpy.ops.mesh.primitive_cylinder_add(location=loc, radius=2.7, depth=1.5, rotation=(1.5708, 0, 0))
    wheel = bpy.context.object
    wheel.name = f"Wheel_{i+1}"
    wheels.append(wheel)
    wheel_material = bpy.data.materials.new(name=f"WheelMaterial_{i+1}")
    wheel_material.diffuse_color = (0, 0, 0, 1)  # Warna hitam
    wheel.data.materials.append(wheel_material)

# Membuat kaca depan
bpy.ops.mesh.primitive_cube_add(size=2, location=(6.8, -46, 7.6))
front_glass = bpy.context.active_object
front_glass.name = "FrontGlass"
front_glass.scale = (3, 7, 1)
glass_material = bpy.data.materials.new(name="GlassMaterial")
glass_material.diffuse_color = (0, 0, 128 / 255, 1)
front_glass.data.materials.append(glass_material)
front_glass.rotation_euler = (0, 10, 0)  # Rotasi 10 derajat

# Membuat kaca belakang
bpy.ops.mesh.primitive_cube_add(size=2, location=(-6.8, -46, 7.6))
back_glass = bpy.context.active_object
back_glass.name = "BackGlass"
back_glass.scale = (3, 7, 1)
back_glass_material = bpy.data.materials.new(name="BackGlassMaterial")
back_glass_material.diffuse_color = (0, 0, 128 / 255, 1) 
back_glass.data.materials.append(back_glass_material)
back_glass.rotation_euler = (0, -10, 0)

# Membuat bumper mobil
bpy.ops.mesh.primitive_cube_add(size=2, location=(0, -46, 3.5))
bumper = bpy.context.active_object
bumper.name = "Bumper"
bumper.scale = (15.4, 6.8, 1)
bumper_material = bpy.data.materials.new(name="BumperMaterial")
bumper_material.diffuse_color = (0, 0, 0, 1)
bumper.data.materials.append(bumper_material)

# Membuat knalpot mobil
exhaust_locations = [(-13, -50, 1.6), (-13, -51, 1.6)]
exhausts = []
for loc in exhaust_locations:
    bpy.ops.mesh.primitive_cylinder_add(radius=0.5, depth=5, location=loc)
    exhaust = bpy.context.active_object
    exhaust.name = "Exhaust"
    exhaust.rotation_euler = (0, 11, 0)
    exhaust_material = bpy.data.materials.new(name="ExhaustMaterial")
    exhaust_material.diffuse_color = (0.2, 0.2, 0.2, 1)
    exhaust.data.materials.append(exhaust_material)
    exhausts.append(exhaust)

# Membuat lampu belakang mobil
lamp_locations = [(-15.2, -51, 6.1), (-15.2, -41, 6.1)]
lamps = []
lamp_material = bpy.data.materials.new(name="LampMaterial")
lamp_material.diffuse_color = (1, 0, 0, 1)  # Warna merah
for loc in lamp_locations:
    bpy.ops.mesh.primitive_cube_add(size=2, location=loc)
    lamp = bpy.context.object
    lamp.scale = (0.2, 1.5, 1)
    lamp.name = "RearLamp"
    lamp.data.materials.append(lamp_material)
    lamps.append(lamp)

# Membuat lampu depan mobil
front_lamp_locations = [(15.2, -51, 6), (15.2, -41, 6)]
front_lamps = []
front_lamp_material = bpy.data.materials.new(name="FrontLampMaterial")
front_lamp_material.diffuse_color = (1, 1, 1, 1)  # Warna putih
for loc in front_lamp_locations:
    bpy.ops.mesh.primitive_cylinder_add(radius=1, depth=0.5, location=loc)
    lamp = bpy.context.object
    lamp.name = "FrontLamp"
    lamp.rotation_euler = (0, 11, 0)
    lamp.data.materials.append(front_lamp_material)
    front_lamps.append(lamp)

# Menggabungkan semua objek mobil
car_parts = [body, roof] + wheels + [front_glass, back_glass, bumper] + exhausts + lamps + front_lamps
for obj in car_parts:
    obj.select_set(True)

# Menjadikan objek aktif sebelum menggabungkan
bpy.context.view_layer.objects.active = body
bpy.ops.object.join()

# ========================================================
# PENAMBAHAN KEYFRAME ANIMASI MAJU-MUNDUR PADA SUMBU X
# ========================================================
car = bpy.context.object  # Objek gabungan mobil

# Set lokasi awal
car.location.x = -80
car.keyframe_insert(data_path="location", frame=1, index=0)  # Frame 1: Posisi awal

# Lokasi maju
car.location.x = 0
car.keyframe_insert(data_path="location", frame=55, index=0)  # Frame 55: Maju

# Lokasi mundur
car.location.x = -80
car.keyframe_insert(data_path="location", frame=80, index=0)  # Frame 80: Mundur

# Kembali ke posisi awal
car.location.x = 0
car.keyframe_insert(data_path="location", frame=80, index=0)

print("Mobil berhasil dibuat dan animasi maju-mundur berhasil ditambahkan!")

# ========================================================
# PENCAHAYAAN (LIGHTING)
# ========================================================

# Menambahkan lampu jenis point light
bpy.ops.object.light_add(type='POINT', location=(0, -70, 120))
light = bpy.context.active_object
light.name = "PointLight"
light.data.energy = 1000000
light.data.color = (1, 1, 1)

# Menambahkan lampu jenis spot light depan
bpy.ops.object.light_add(type='SPOT', location=(55, -48, 38))
light = bpy.context.active_object
light.name = "SpotLight"
light.data.energy = 100000
light.data.color = (1, 1, 1)
light.data.spot_size = 1.8
light.data.spot_blend = 0.18
light.rotation_euler = (0, 13.5, 0)

# Menambahkan lampu jenis spot light belakang
bpy.ops.object.light_add(type='SPOT', location=(-55, -48, 38))
light = bpy.context.active_object
light.name = "SpotLight"
light.data.energy = 100000
light.data.color = (1, 1, 1)
light.data.spot_size = 1.8
light.data.spot_blend = 0.18
light.rotation_euler = (0, -13.5, 0)

# ========================================================
# MEMBUAT MOBIL KEDUA (MOBIL KUNING/HIJAU)
# ========================================================

bpy.ops.mesh.primitive_cube_add(size=2, location=(0, -80, 4.5))
body = bpy.context.active_object
body.name = "Body"
body.scale = (15, 7, 2.9)
body_material = bpy.data.materials.new(name="BodyMaterial")
body_material.diffuse_color = (0, 1, 0, 1)  # Warna hijau
body.data.materials.append(body_material)

bpy.ops.mesh.primitive_cube_add(size=2, location=(0, -80, 8.4))
roof = bpy.context.active_object
roof.name = "Roof"
roof.scale = (5, 7, 1.5)
roof_material = bpy.data.materials.new(name="RoofMaterial")
roof_material.diffuse_color = (0, 1, 0, 1)
roof.data.materials.append(roof_material)

wheel_locations = [(8, -72, 2.7), (-8, -72, 2.7), (8, -88, 2.7), (-8, -88, 2.7)]
wheels = []
for i, loc in enumerate(wheel_locations):
    bpy.ops.mesh.primitive_cylinder_add(location=loc, radius=2.7, depth=1.5, rotation=(1.5708, 0, 0))
    wheel = bpy.context.object
    wheel.name = f"Wheel_{i+1}"
    wheels.append(wheel)
    wheel_material = bpy.data.materials.new(name=f"WheelMaterial_{i+1}")
    wheel_material.diffuse_color = (0, 0, 0, 1)
    wheel.data.materials.append(wheel_material)

bpy.ops.mesh.primitive_cube_add(size=2, location=(6.8, -80, 7.5))
front_glass = bpy.context.active_object
front_glass.name = "FrontGlass"
front_glass.scale = (3, 7, 1)
glass_material = bpy.data.materials.new(name="GlassMaterial")
glass_material.diffuse_color = (0, 1, 0, 1)
front_glass.data.materials.append(glass_material)
front_glass.rotation_euler = (0, 10, 0)

bpy.ops.mesh.primitive_cube_add(size=2, location=(-6.8, -80, 7.5))
back_glass = bpy.context.active_object
back_glass.name = "BackGlass"
back_glass.scale = (3, 7, 1)
back_glass.data.materials.append(glass_material)
back_glass.rotation_euler = (0, -10, 0)

bpy.ops.mesh.primitive_cube_add(size=2, location=(0, -80, 3.5))
bumper = bpy.context.active_object
bumper.name = "Bumper"
bumper.scale = (15.4, 6.8, 1)
bumper_material = bpy.data.materials.new(name="BumperMaterial")
bumper_material.diffuse_color = (0, 0, 0, 1)
bumper.data.materials.append(bumper_material)

exhaust_locations = [(-13, -82.2, 1.6), (-13, -83, 1.6)]
exhausts = []
for loc in exhaust_locations:
    bpy.ops.mesh.primitive_cylinder_add(radius=0.5, depth=5, location=loc)
    exhaust = bpy.context.active_object
    exhaust.name = "Exhaust"
    exhaust.rotation_euler = (0, 11, 0)
    exhaust_material = bpy.data.materials.new(name="ExhaustMaterial")
    exhaust_material.diffuse_color = (0.2, 0.2, 0.2, 1)
    exhaust.data.materials.append(exhaust_material)
    exhausts.append(exhaust)

lamp_locations = [(-15.2, -75, 6.1), (-15.2, -85, 6.1)]
lamps = []
lamp_material = bpy.data.materials.new(name="LampMaterial")
lamp_material.diffuse_color = (1, 0, 0, 1)
for loc in lamp_locations:
    bpy.ops.mesh.primitive_cube_add(size=2, location=loc)
    lamp = bpy.context.object
    lamp.scale = (0.2, 1.5, 1)
    lamp.name = "RearLamp"
    lamp.data.materials.append(lamp_material)
    lamps.append(lamp)

front_lamp_locations = [(15.2, -75, 6), (15.2, -85, 6)]
front_lamps = []
front_lamp_material = bpy.data.materials.new(name="FrontLampMaterial")
front_lamp_material.diffuse_color = (1, 1, 1, 1)
for loc in front_lamp_locations:
    bpy.ops.mesh.primitive_cylinder_add(radius=1, depth=0.5, location=loc)
    lamp = bpy.context.object
    lamp.name = "FrontLamp"
    lamp.rotation_euler = (0, 11, 0)
    lamp.data.materials.append(front_lamp_material)
    front_lamps.append(lamp)

car_parts = [body, roof] + wheels + [front_glass, back_glass, bumper] + exhausts + lamps + front_lamps
for obj in car_parts:
    obj.select_set(True)

bpy.context.view_layer.objects.active = body
bpy.ops.object.join()

print("Mobil berhasil dibuat dan digabung!")
`;

export const THREEJS_CONTROLLER_SCRIPT = `// ========================================================
// CONTROLLER ANIMASI 3D (THREE.JS / REACT THREE FIBER)
// Menjalankan animasi "BodyAction.017" dari file GLTF/GLB di Web
// ========================================================

import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, useAnimations, Center, OrbitControls } from "@react-three/drei";
import modelUrl from "./projek animasi 1 jihanz.glb";

export function AnimatedModel({ isPlaying = true, speed = 1.0 }) {
  // 1. Memuat model GLTF/GLB dan klip animasi
  const { scene, animations } = useGLTF(modelUrl);
  const { actions, names } = useAnimations(animations, scene);

  // 2. Inisialisasi dan jalankan klip animasi (BodyAction.017)
  useEffect(() => {
    if (actions && names.length > 0) {
      names.forEach((clipName) => {
        const action = actions[clipName];
        if (action) {
          action.reset().fadeIn(0.4).play();
        }
      });
    }
  }, [actions, names]);

  // 3. Kontrol playback realtime (play/pause & timescale kecepatan)
  useEffect(() => {
    if (actions) {
      names.forEach((clipName) => {
        const action = actions[clipName];
        if (action) {
          action.paused = !isPlaying;
          action.setEffectiveTimeScale(speed);
        }
      });
    }
  }, [isPlaying, speed, actions, names]);

  return (
    <Center top={false}>
      <primitive object={scene} />
    </Center>
  );
}
`;

export const GLTF_METADATA_SPECS = `{
  "projectInfo": {
    "title": "Projek Animasi 1 - SPBU Gas Station & Indomaret",
    "author": "Jihanz Fairuz Tsani",
    "software": "Blender 3D -> GLTF / Three.js WebGL",
    "glbAsset": "projek animasi 1 jihanz.glb",
    "fileSize": "1.99 MB (1,995,272 bytes)"
  },
  "animationTrack": {
    "clipName": "BodyAction.017",
    "animatedNode": "Body (Mobil Utama)",
    "channelPath": "translation",
    "totalFrames": 80,
    "fps": 24,
    "durationSeconds": 3.333,
    "keyframeTimeline": [
      { "frame": 1, "time": "0.04s", "positionX": -80.0, "status": "Posisi Awal SPBU" },
      { "frame": 55, "time": "2.29s", "positionX": 0.0, "status": "Maju ke Depan Dispenser Gas" },
      { "frame": 80, "time": "3.33s", "positionX": -80.0, "status": "Mundur / Looping Siklus" }
    ],
    "interpolation": "LINEAR"
  },
  "sceneHierarchy": {
    "totalMeshes": 111,
    "groundPlane": "MyPlane (200x200)",
    "buildings": [
      "Dinding Abu (Kaca)",
      "Dinding Putih",
      "Atap Putih (30x40x2.2)",
      "Atap Merah (30x40x0.5)",
      "Gedung Tingkat (Kuning, Biru, Merah, Putih)",
      "8 Tiang Silinder SPBU (Tinggi 34 unit)",
      "Taman Hijau & Abu-abu",
      "Cone Pengaman Lalu Lintas"
    ],
    "vehicles": [
      "Mobil Biru Tua (Body dengan animasi translasi maju-mundur)",
      "Mobil Hijau (Kendaraan pengisi bahan bakar kedua)"
    ],
    "3dTextSignage": [
      "INDOMARET (Logo & Signage Utama)",
      "GAS STATION (Atap SPBU)"
    ]
  }
}
`;
